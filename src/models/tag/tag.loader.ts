import { Tag } from './../../dto/tag/TagDTO';
import { TagService } from './tag.service';
import * as DataLoader from 'dataloader';
import { helperService } from 'src/common/HelperService';

export function createTagsLoader(tagService: TagService) {
  return new DataLoader<string, Tag>(async (ids: string[]) => {
    const tags = await tagService.findByIds(ids);
    const tagsMap = helperService.mapFromArray(tags, (tag) => tag.id);
    return ids.map((id) => tagsMap[id]);
  });
}