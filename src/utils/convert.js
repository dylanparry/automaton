import leftpad from 'leftpad';

export default class Convert {
    static hexBufferToBinaryString(buffer, length) {
        return leftpad(parseInt(buffer.toString('hex'), 16).toString(2), length);
    }
}
