interface Location {
  coordinates: Array<number>
}

interface BookInstance {
  id: string
  book: Book
  user: User
  location: Location
}