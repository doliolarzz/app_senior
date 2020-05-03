export const Types = {
  GET_METRICS_DATA_REQUEST: 'GET_METRICS_DATA_REQUEST',
  GET_METRICS_DATA_SUCCESS: 'GET_METRICS_DATA_SUCCESS',
  GET_METRICS_DATA_FAILED: 'GET_METRICS_DATA_FAILED',

  GET_IMGS_DATA_REQUEST: 'GET_IMGS_DATA_REQUEST',
  GET_IMGS_DATA_SUCCESS: 'GET_IMGS_DATA_SUCCESS',
  GET_IMGS_DATA_FAILED: 'GET_IMGS_DATA_FAILED',
}

export const getMetricsDataRequest = ({ dt }) => ({
  type: Types.GET_METRICS_DATA_REQUEST,
  payload: { dt }
})

export const getMetricsDataSuccess = ({ data }) => ({
  type: Types.GET_METRICS_DATA_SUCCESS,
  payload: { data }
})

export const getMetricsDataFailed = ({ error }) => ({
  type: Types.GET_METRICS_DATA_FAILED,
  payload: { error }
})

export const getImagesDataRequest = ({ dt }) => ({
  type: Types.GET_IMGS_DATA_REQUEST,
  payload: { dt }
})

export const getImagesDataSuccess = ({ data }) => ({
  type: Types.GET_IMGS_DATA_SUCCESS,
  payload: { data }
})

export const getImagesDataFailed = ({ error }) => ({
  type: Types.GET_IMGS_DATA_FAILED,
  payload: { error }
})