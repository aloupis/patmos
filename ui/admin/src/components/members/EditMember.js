import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/client';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PageWrapper from '../../common/PageWrapper';
import MemberForm from './MemberForm';
import Loading from '../../common/Loading';
import DeleteConfirmationButton from '../../common/DeleteConfirmationButton';
import { SnackbarContext } from '../../SnackbarContext';
import AssetContainer from '../../common/media/asset/AssetContainer';
import { deleteAsset } from '../../services/asset';

import {
  MEMBER_BY_PK_QUERY,
  UPDATE_MEMBER_MUTATION,
  DELETE_MEMBER_MUTATION,
} from './model';

const EditMember = ({ history, match }) => {
  const { data, loading, error } = useQuery(MEMBER_BY_PK_QUERY, {
    variables: { id: +match.params.id },
  });
  const [imagePublicId, setImagePublicId] = useState(
    data?.member_by_pk?.image_public_id || ''
  );
  const { showMessage, showGenericErrorMessage } = useContext(SnackbarContext);

  const [updateMember] = useMutation(UPDATE_MEMBER_MUTATION);
  const handleSave = async (member) => {
    try {
      await updateMember({
        variables: {
          id: +match.params.id,
          set: {
            name_en: member.name_en,
            description_en: member.description_en,
            name_gr: member.name_gr,
            description_gr: member.description_gr,
            image_public_id: imagePublicId,
            summary_en: member.summary_en,
            summary_gr: member.summary_gr,
            position_en: member.position_en,
            position_gr: member.position_gr,
          },
        },
        refetchQueries: [`MEMBERS_QUERY`],
      });
      showMessage('Member has been successfully updated!');
      return history.push(`/members`);
    } catch (err) {
      console.log(err);
      showGenericErrorMessage();
    }
  };
  const [deleteMember] = useMutation(DELETE_MEMBER_MUTATION);
  const handleDelete = async () => {
    try {
      const res = await deleteMember({ variables: { id: +match.params.id } });
      if (data?.member_by_pk?.image_public_id) {
        const assetRes = await deleteAsset(data.member_by_pk.image_public_id);
        if (assetRes.status !== 200) {
          showGenericErrorMessage();
        }
      }
      if (res?.data?.delete_member?.success) {
        showMessage('Member has been successfully deleted!');
      } else {
        showGenericErrorMessage();
      }

      return history.push(`/members`);
    } catch (err) {
      console.log(err);
      showGenericErrorMessage();
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <PageWrapper title="Edit Member" maxWidth="lg" goBackBtn="/members">
      <Grid container direction="row" justify="flex-end" alignItems="baseline">
        <DeleteConfirmationButton
          component="fab"
          size="medium"
          onConfirm={handleDelete}
        />
      </Grid>
      <div style={{ marginBottom: '15px' }}>
        <Typography variant="h6">Image</Typography>
      </div>
      <AssetContainer
        url={`members/${match.params.id}`}
        publicId={data.member_by_pk.image_public_id || ''}
        acceptedFileTypes="image/jpeg,image/png,image/gif"
        updateEntity={setImagePublicId}
      />
      <div style={{ marginBottom: '10px' }} />
      <MemberForm
        onSave={handleSave}
        member={data.member_by_pk}
        history={history}
      />
    </PageWrapper>
  );
};

EditMember.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
};

export default EditMember;
