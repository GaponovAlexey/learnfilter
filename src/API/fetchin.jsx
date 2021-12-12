import axios from 'axios'

export default class ApiResponse {
  static async getAll(page, limit) {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/posts/',
      {
        params: {
          _limit: limit,
          _page: page,
        },
      }
    )
    return response
  }
}
