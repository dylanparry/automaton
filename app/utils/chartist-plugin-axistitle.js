import Chartist from 'chartist';

const axisDefaults = {
  axisTitle: '',
  axisClass: 'ct-axis-title',
  offset: {
    x: 0,
    y: 0,
  },
  textAnchor: 'middle',
  flipText: false,
};

const defaultOptions = {
  axisX: Chartist.extend({}, axisDefaults),
  axisY: Chartist.extend({}, axisDefaults),
};

// as axisX will usually be at the bottom, set it to be below the labels
defaultOptions.axisX.offset.y = 40;

// this will stop the title text being slightly cut off at the bottom.
// TODO - implement a cleaner fix.
defaultOptions.axisY.offset.y = -1;

const AxisTitle = (options) => {
  const processedOptions = Chartist.extend({}, defaultOptions, options);

  return function ctAxisTitle(chart) {
    chart.on('created', (data) => {
      if (!processedOptions.axisX.axisTitle && !processedOptions.axisY.axisTitle) {
        throw new Error('ctAxisTitle plugin - You must provide at least one axis title');
      }
      else if (!data.axisX && !data.axisY) {
        throw new Error('ctAxisTitle plugin can only be used on charts that have at least one axis');
      }

      let xPos;
      let yPos;
      let title;

      // position axis X title
      if (processedOptions.axisX.axisTitle && data.axisX) {
        xPos = (data.axisX.axisLength / 2) +
          data.options.axisY.offset +
          data.options.chartPadding.left;

        yPos = data.options.chartPadding.top;

        if (data.options.axisY.position === 'end') {
          xPos -= data.options.axisY.offset;
        }

        if (data.options.axisX.position === 'end') {
          yPos += data.axisY.axisLength;
        }

        title = new Chartist.Svg('text');
        title.addClass(processedOptions.axisX.axisClass);
        title.text(processedOptions.axisX.axisTitle);
        title.attr({
          x: xPos + processedOptions.axisX.offset.x,
          y: yPos + processedOptions.axisX.offset.y,
          'text-anchor': processedOptions.axisX.textAnchor,
        });

        data.svg.append(title, true);
      }

      // position axis Y title
      if (processedOptions.axisY.axisTitle && data.axisY) {
        xPos = 0;


        yPos = (data.axisY.axisLength / 2) + data.options.chartPadding.top;

        if (data.options.axisX.position === 'start') {
          yPos += data.options.axisX.offset;
        }

        if (data.options.axisY.position === 'end') {
          xPos = data.axisX.axisLength;
        }

        const transform = `rotate(${(processedOptions.axisY.flipTitle ? -90 : 90)},${xPos},${yPos})`;

        title = new Chartist.Svg('text');
        title.addClass(processedOptions.axisY.axisClass);
        title.text(processedOptions.axisY.axisTitle);
        title.attr({
          x: xPos + processedOptions.axisY.offset.x,
          y: yPos + processedOptions.axisY.offset.y,
          transform,
          'text-anchor': processedOptions.axisY.textAnchor,
        });

        data.svg.append(title, true);
      }
    });
  };
};

export default AxisTitle;
