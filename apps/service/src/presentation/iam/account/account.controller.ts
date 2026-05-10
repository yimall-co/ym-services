import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Accounts')
@Controller({
    path: 'accounts',
    version: '1',
})
export class AccountController { }
