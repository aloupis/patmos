import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import PageWrapper from '../../common/PageWrapper';
import MemberForm from './MemberForm';
import { SnackbarContext } from '../../SnackbarContext';

import { CREATE_MEMBER_MUTATION } from './model';

const NewMember = (props) => {
  const { showMessage, showGenericErrorMessage } = useContext(SnackbarContext);
  const { history } = props;

  const [createMember] = useMutation(CREATE_MEMBER_MUTATION);
  const handleSave = async (member) => {
    try {
      const {
        data: {
          insert_member: { id },
        },
      } = await createMember({
        variables: {
          input: {
            name_en: member.name_en,
            description_en: member.description_en,
            name_gr: member.name_gr,
            description_gr: member.description_gr,
            summary_en: member.summary_en,
            summary_gr: member.summary_gr,
          },
        },
      });

      showMessage('Members has been successfully created !');

      return history.push(`/members/${id}`);
    } catch (err) {
      console.log(err);
      showGenericErrorMessage();
    }
  };

  return (
    <PageWrapper title="New Member" maxWidth="lg" goBackBtn="/members">
      <MemberForm onSave={handleSave} history={history} />
    </PageWrapper>
  );
};

NewMember.propTypes = {
  history: PropTypes.object,
};

export default NewMember;
