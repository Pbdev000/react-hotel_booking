import { createAction, createSlice } from '@reduxjs/toolkit';
import likesService from '../services/likes.service';
import isOutDated from '../utils/isOutDated';

const likesSlice = createSlice({
  name: 'likes',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null,
  },
  reducers: {
    likesRequested: state => {
      state.isLoading = true;
    },
    likesReceived: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    likesRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    likeCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    likeRemoved: (state, action) => {
      state.entities = state.entities.filter(like => like._id !== action.payload);
    },
  },
});

const { actions, reducer: likesReducer } = likesSlice;

const { likesRequested, likesReceived, likesRequestFailed, likeCreated, likeRemoved } = actions;

const likeCreateRequested = createAction('likes/likeCreateRequested');
const likeCreateRequestedFailed = createAction('likes/likeCreateRequestedFailed');

const likeRemoveRequested = createAction('likes/likeRemoveRequested');
const likeRemoveRequestedFailed = createAction('likes/likeRemoveRequestedFailed');

export const loadLikesList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().likes;
  if (isOutDated(lastFetch)) {
    dispatch(likesRequested());
    try {
      const { content } = await likesService.getAll();
      dispatch(likesReceived(content));
    } catch (error) {
      dispatch(likesRequestFailed(error.message));
    }
  }
};

export const getLikes = () => state => state.likes.entities;
export const getLikesLoadingStatus = () => state => state.likes.isLoading;

export const getLikesByReviewId = reviewId => state => {
  if (state.likes.entities) {
    return state.likes.entities.filter(like => like.reviewId === reviewId);
  }
};

export const getLikesByUserId = userId => state => {
  if (state.likes.entities) {
    return state.likes.entities.filter(like => like.userId === userId);
  }
};

export const createLike = payload => async dispatch => {
  dispatch(likeCreateRequested());
  try {
    const { content } = await likesService.create(payload);
    dispatch(likeCreated(content || []));
  } catch (error) {
    dispatch(likeCreateRequestedFailed());
  }
};

export const removeLike = payload => async (dispatch, getState) => {
  dispatch(likeRemoveRequested());
  try {
    const { entities } = getState().likes;
    const userLikes = entities.filter(like => like.userId === payload.userId);
    const currentLike = userLikes.find(like => like.reviewId === payload.reviewId);
    const likeId = await likesService.remove(currentLike._id);
    dispatch(likeRemoved(likeId));
  } catch (error) {
    console.log(error);
    dispatch(likeRemoveRequestedFailed());
  }
};

export default likesReducer;
