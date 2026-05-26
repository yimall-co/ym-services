import { Uuid } from 'shared/domain/value-object/uuid';

import { Color } from './color';

export interface ColorRepository {
    save(color: Color): Promise<void>;
    update(id: Uuid, color: Color): Promise<void>;
}
