package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/cloudinary/cloudinary-go"
	"github.com/cloudinary/cloudinary-go/api"
	"github.com/cloudinary/cloudinary-go/api/admin"
	"github.com/cloudinary/cloudinary-go/api/admin/search"
	"github.com/cloudinary/cloudinary-go/api/uploader"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Asset struct {
	PublicId  string    `json:"public_id"`
	Format    string    `json:"format"`
	Url       string    `json:"url"`
	CreatedAt time.Time `json:"created_at"`
	Width     int       `json:"width"`
	Height    int       `json:"height"`
	Type      string    `json:"resource_type"`
}

func listFilesHandler(c *gin.Context) {
	var cld, err = cloudinary.New()
	if err != nil {
		log.Fatalf("Failed to initialize Cloudinary, %v", err)
	}
	var ctx = context.Background()

	folder := c.PostForm("folder")

	// Cloudinary also provides a very flexible Search API for filtering and retrieving
	// information on all the assets in your account with the help of query expressions
	// in a Lucene-like query language.
	searchQuery := search.Query{
		Expression: "folder:" + folder + "/*",
		SortBy:     []search.SortByField{{"created_at": search.Descending}},
		MaxResults: 30,
	}

	searchResult, err := cld.Admin.Search(ctx, searchQuery)

	if err != nil {
		log.Fatalf("Failed to search for assets, %v\n", err)
	}

	var assets []Asset
	for _, asset := range searchResult.Assets {
		asset := Asset{
			PublicId:  asset.PublicID,
			Format:    asset.Format,
			Url:       asset.SecureURL,
			CreatedAt: asset.CreatedAt,
			Width:     asset.Width,
			Height:    asset.Height,
			Type:      asset.ResourceType,
		}

		assets = append(assets, asset)
	}

	json_data, err := json.Marshal(assets)

	if err != nil {
		log.Fatal(err)
	}

	c.JSON(200, json_data)
}

func uploadHandler(c *gin.Context) {
	var cld, err = cloudinary.New()
	if err != nil {
		log.Fatalf("Failed to initialize Cloudinary, %v", err)
	}
	var ctx = context.Background()

	form, formParseErr := c.MultipartForm()
	if formParseErr != nil {
		c.String(http.StatusBadRequest, "")
		return
	}
	files := form.File["files"]
	path := form.Value["path"][0]
	var assets []Asset
	for _, file := range files {
		openedFile, openFileErr := file.Open()
		if openFileErr != nil {
			c.String(http.StatusInternalServerError, "")
		}

		uploaded, err := cld.Upload.Upload(ctx, openedFile, uploader.UploadParams{Folder: path})
		if err != nil {
			log.Fatalf("Failed to upload to Cloudinary, %v", err)

		}
		asset := Asset{
			PublicId:  uploaded.PublicID,
			Format:    uploaded.Format,
			Url:       uploaded.SecureURL,
			CreatedAt: uploaded.CreatedAt,
			Width:     uploaded.Width,
			Height:    uploaded.Height,
			Type:      uploaded.ResourceType,
		}
		assets = append(assets, asset)
	}

	json_data, err := json.Marshal(assets)

	if err != nil {
		log.Fatal(err)
	}
	c.JSON(http.StatusOK, json_data)

}

func deleteHandler(c *gin.Context) {
	var cld, err = cloudinary.New()
	if err != nil {
		log.Fatalf("Failed to initialize Cloudinary, %v", err)
	}
	var ctx = context.Background()

	key := c.PostForm("key")
	fmt.Println(key)

	_, err2 := cld.Admin.DeleteAssetsByPrefix(ctx, admin.DeleteAssetsByPrefixParams{
		Prefix: api.CldAPIArray{key},
	})
	if err2 != nil {
		log.Fatalf("Failed to delete, %v", err)
	}
	c.String(http.StatusOK, "OK")
}

func main() {
	port := os.Getenv("PORT")
	os.Setenv("CLOUDINARY_URL", os.Getenv("CLOUDINARY_URL"))
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "HEAD", "OPTIONS", "POST", "PUT"},
		AllowHeaders:     []string{"sentry-trace", "pragma", "authorization", "Access-Control-Allow-Headers", "Origin", "Accept", "X-Requested-With", "Content-Type", "Access-Control-Request-Method", "Access-Control-Request-Headers", "Access-Control-Allow-Origin"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// CORS for https://foo.com and https://github.com origins, allowing:
	// - PUT and PATCH methods
	// - Origin header
	// - Credentials share
	// - Preflight requests cached for 12 hours
	// r.Use(cors.New(cors.Config{
	// 	AllowOrigins:     []string{"https://patmos-nginx.herokuapp.com", "https://patmos-site.herokuapp.com", "http://patmos-nginx.herokuapp.com", "http://patmos-site.herokuapp.com", "patmos-nginx.herokuapp.com", "patmos-site.herokuapp.com"},
	// 	AllowMethods:     []string{"GET", "HEAD", "OPTIONS", "POST", "PUT"},
	// 	AllowHeaders:     []string{"pragma", "authorization", "Access-Control-Allow-Headers", "Origin", "Accept", "X-Requested-With", "Content-Type", "Access-Control-Request-Method", "Access-Control-Request-Headers", "Access-Control-Allow-Origin"},
	// 	ExposeHeaders:    []string{"Content-Length"},
	// 	AllowCredentials: true,
	// 	AllowOriginFunc: func(origin string) bool {
	// 		return origin == "https://patmos-nginx.herokuapp.com" || origin == "http://patmos-nginx.herokuapp.com" || origin == "patmos-nginx.herokuapp.com" || origin == "https://patmos-site.herokuapp.com" || origin == "http://patmos-site.herokuapp.com" || origin == "patmos-site.herokuapp.com"
	// 	},
	// 	MaxAge: 12 * time.Hour,
	// }))

	r.GET("/files/*folder", listFilesHandler)
	r.POST("/files", listFilesHandler)
	r.PUT("/upload", uploadHandler)
	r.POST("/delete", deleteHandler)
	r.Run(":" + port)
}
