import { WorkService } from './work/work.service';
import { Tag } from './../dto/tag/TagDTO';
import { TagService } from './tag/tag.service';
import * as DataLoader from 'dataloader';
import { helperService } from 'src/common/HelperService';
import { User } from 'src/dto/user/UserDTO';
import { UserService } from './users/user.service';

class LoaderService {
  responseLoader(models, ids: string[]) {
    const modelsMap = helperService.mapFromArray(models, (model: any) => model.id);
    return ids.map(id => modelsMap[id]);
  }
  userLoader(userService: UserService) {
    return new DataLoader<string, User>(async (ids: string[]) => {
      const users = await userService.findByIds(ids);
      return this.responseLoader(users, ids);
    });
  }
  tagLoader(tagService: TagService) {
    return new DataLoader<string, Tag>(async (ids: string[]) => {
      const tags = await tagService.findByIds(ids);
      return this.responseLoader(tags, ids);
    });
  }
  workLoader(workService: WorkService) {
    return new DataLoader<string, Tag>(async (ids: string[]) => {
      console.log('=-=================> ', ids);
      console.log(workService);
      const works = await workService.findByIds(ids);
      return this.responseLoader(works, ids);
    });
  }
}

export const loaderService = new LoaderService();
