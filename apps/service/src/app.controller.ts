import { Controller, Get } from '@nestjs/common';

@Controller({
    path: '',
    version: '1',
})
export class AppController {
    constructor() { }

    @Get('health')
    health() {
        return 'OK';
    }
}
