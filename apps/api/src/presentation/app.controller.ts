import { controller, Get, HttpResponseOK, IAppController } from '@foal/core';

export class AppController implements IAppController {
    @Get('/')
    index() {
        return new HttpResponseOK('Hello world');
    }
}