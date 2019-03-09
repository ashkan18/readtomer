import axios from 'axios'
import AuthService from './auth_service';

interface FindResponse{
  book: any
  external: any
}

interface Coords {
  latitude: number
  longitude: number
}

export default class BookService {
  authService: AuthService = new AuthService;
  // Initializing important variables
  constructor() {
    this.findBook = this.findBook.bind(this)
    this.authService
  }

  public findBook(isbn: string): Promise<FindResponse>{
    return new Promise((resolve, rejected) =>
      this.authService.getToken()
      .then( token => {
        axios.get(`https://readtome.herokuapp.com/api/find_in_the_wild?isbn=${isbn}`,
        { headers: { 'Authorization': `Bearer ${token}` }})
        .then( response => resolve(response.data))
        .catch( error => rejected(error))
      })
      .catch(error => rejected(error))
    )
  }

  public submitBook(coords: Coords, bookId: string): Promise<{}>{
    return new Promise((resolve, rejected) =>
      this.authService.getToken()
      .then( token => {
        axios({
          url: "https://readtome.herokuapp.com/api/book_instance",
          method: "post",
          data: { book_instance: { medium: 'test', offerings: 'reading',  condition: 'fair', location: [coords.latitude, coords.longitude].join(','), book_id: bookId} },
          headers: { 'Authorization': `Bearer ${token}`} }
        )
        .then( response => resolve(response.data))
        .catch( error => rejected(error))
      })
      .catch(error => rejected(error))
    )
  }
}
