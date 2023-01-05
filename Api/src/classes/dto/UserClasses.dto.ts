import { UserSearchDto } from 'src/users/dto/UserSearch.dto'
import { ClassSearchDto } from './ClassSearch.dto'

export class UsersClassClassDto {
  id?: string
  user: UserSearchDto
  classes: ClassSearchDto
}
