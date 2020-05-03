export const Types = {
  GET_DATA_RANGE_REQUEST: 'GET_DATA_RANGE_REQUEST',
  GET_DATA_RANGE_SUCCESS: 'GET_DATA_RANGE_SUCCESS',
  GET_DATA_RANGE_FAILED: 'GET_DATA_RANGE_FAILED',

  GET_IMGS_DATA_REQUEST: 'GET_IMGS_DATA_REQUEST',
  GET_IMGS_DATA_SUCCESS: 'GET_IMGS_DATA_SUCCESS',
  GET_IMGS_DATA_FAILED: 'GET_IMGS_DATA_FAILED',
}

export const getDataRangeRequest = () => ({
  type: Types.GET_DATA_RANGE_REQUEST,
})

export const getDataRangeSuccess = ({ data }) => ({
  type: Types.GET_DATA_RANGE_SUCCESS,
  payload: { data }
})

export const getDataRangeFailed = ({ error }) => ({
  type: Types.GET_DATA_RANGE_FAILED,
  payload: { error }
})

export const getImagesDataRequest = ({ time }) => ({
  type: Types.GET_IMGS_DATA_REQUEST,
  payload: { time }
})

export const getImagesDataSuccess = ({ data }) => ({
  type: Types.GET_IMGS_DATA_SUCCESS,
  payload: { data }
})

export const getImagesDataFailed = ({ error }) => ({
  type: Types.GET_IMGS_DATA_FAILED,
  payload: { error }
})