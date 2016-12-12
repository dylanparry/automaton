import { map, observable } from 'mobx';

export default class Room {
    id = 0;
    name = '';
    rfAddress = '';

    @observable devices = map();

    constructor({ id, name, rfAddress }) {
        this.id = id;
        this.name = name;
        this.rfAddress = rfAddress;
    }
}
