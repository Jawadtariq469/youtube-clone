import styled from 'styled-components';

interface CommentEntryContainerProps {
  $isReply: boolean;
}

export const CommentsSection = styled.section`
  width: 100%;
  margin-top: 28px;
`;

export const CommentsHeading = styled.h2`
  margin: 0 0 24px;

  color: inherit;

  font-size: 20px;
  font-weight: 600;
`;

export const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const CommentThreadContainer = styled.article`
  width: 100%;
  min-width: 0;
`;

export const CommentEntryContainer = styled.div<CommentEntryContainerProps>`
  display: grid;

  grid-template-columns: ${({ $isReply }) =>
    $isReply ? '32px minmax(0, 1fr)' : '40px minmax(0, 1fr)'};

  align-items: start;

  gap: ${({ $isReply }) => ($isReply ? '10px' : '12px')};
`;

export const CommentContent = styled.div`
  min-width: 0;
`;

export const CommentAuthorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  margin-bottom: 6px;
`;

export const CommentAuthorName = styled.span`
  overflow: hidden;

  color: inherit;

  font-size: 13px;
  font-weight: 600;

  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const CommentPublishedAt = styled.span`
  flex-shrink: 0;

  color: inherit;

  font-size: 12px;

  opacity: 0.65;
`;

export const CommentText = styled.p`
  margin: 0;

  overflow-wrap: anywhere;

  color: inherit;

  font-size: 14px;
  line-height: 1.45;

  white-space: pre-wrap;
`;

export const CommentActions = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;

  margin-top: 10px;
`;

export const CommentActionText = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;

  color: inherit;

  font-size: 12px;

  opacity: 0.75;
`;

export const CommentRepliesArea = styled.div`
  margin-top: 10px;
  margin-left: 52px;

  @media (max-width: 600px) {
    margin-left: 42px;
  }
`;

export const CommentRepliesContainer = styled.div`
  margin-top: 12px;
`;

export const CommentRepliesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const CommentButtonRow = styled.div`
  display: flex;
  align-items: center;

  margin-top: 12px;
`;

export const CommentsStatusMessage = styled.p`
  margin: 18px 0;

  color: inherit;

  font-size: 14px;

  opacity: 0.75;
`;

export const CommentReplyStatus = styled.p`
  margin: 8px 0;

  color: inherit;

  font-size: 13px;

  opacity: 0.7;
`;

export const CommentComposerContainer = styled.div`
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr);
  align-items: start;
  gap: 12px;

  margin-bottom: 28px;
`;

export const CommentComposerForm = styled.form`
  min-width: 0;
`;

export const CommentComposerActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;

  margin-top: 10px;
`;

export const CommentSkeletonContainer = styled.div`
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr);
  gap: 12px;
`;

export const CommentSkeletonContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  padding-top: 2px;
`;
