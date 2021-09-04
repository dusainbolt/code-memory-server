import * as DataLoader from 'dataloader';
import { mapFromArray } from 'src/common/functions';
import { User } from './dto/user-dto';
import { UserService } from './user.service';


export function createUsersLoader(userService: UserService) {
  return new DataLoader<number, User>(async (ids: any) => {

    const users = await userService.findByIds(ids);
    const usersMap = mapFromArray(users, (user) => user.id);
    return ids.map((id) => usersMap[id]);
  });
}