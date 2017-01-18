export default class ClassBuilder {
  classes = new Map();

  set background(value) {
    this.classes.set('background', value);
  }

  set color(value) {
    this.classes.set('color', value);
  }

  useIcon(value = true) {
    this.classes.set('icon', value ? 'icon' : undefined);
  }

  set iconName(value) {
    this.classes.set('iconName', value);
  }

  useTextShadow(value = true) {
    this.classes.set('textShadow', value ? 'text-shadow' : undefined);
  }

  set tile(value) {
    this.classes.set('tile', value);
  }

  toString() {
    return [...this.classes.values()].join(' ');
  }
}
