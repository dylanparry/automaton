export default class ClassList {
    _classes = new Map();

    set background(value) {
        this._classes.set('background', value);
    }

    set color(value) {
        this._classes.set('color', value);
    }

    useIcon(value = true) {
        this._classes.set('icon', value ? 'icon' : undefined);
    }

    set iconName(value) {
        this._classes.set('iconName', value);
    }

    useTextShadow(value = true) {
        this._classes.set('textShadow', value ? 'text-shadow' : undefined);
    }

    set tile(value) {
        this._classes.set('tile', value);
    }

    toString() {
        return [...this._classes.values()].join(' ');
    }
}
