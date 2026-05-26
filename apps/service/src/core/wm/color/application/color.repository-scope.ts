import { ColorRepository } from '../domain/color.repository';
import { ColorQueryRepository } from './query/color-query.repository';

export interface ColorRepositoryScope {
    getColorRepository(): ColorRepository;
    getColorQueryRepository(): ColorQueryRepository;
}
