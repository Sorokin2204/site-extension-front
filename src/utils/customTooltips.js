export const customTooltips = function (context) {
  // Tooltip Element
  let tooltipEl = document.querySelector('.chartjs-tooltip');
  const container = context.chart.canvas.closest('.parentContainer');
  console.log(container);
  if (container && !container.contains(tooltipEl)) {
    tooltipEl = document.createElement('div');
    tooltipEl.className = 'chartjs-tooltip';
    tooltipEl.innerHTML = '<table></table>';

    document.querySelectorAll('.parentContainer').forEach((el) => {
      if (el.contains(tooltipEl)) {
        tooltipEl.remove();
      }
    });

    container.appendChild(tooltipEl);
  }

  function getBody(bodyItem) {
    return bodyItem.lines;
  }

  if (tooltipEl !== null) {
    const tooltipModel = context.tooltip;
    // Hide if no tooltip
    if (tooltipModel.opacity === 0) {
      tooltipEl.style.opacity = 0;
      return;
    }

    // Set caret Position
    tooltipEl.classList.remove('above', 'below', 'no-transform');
    if (tooltipModel.yAlign) {
      tooltipEl.classList.add(tooltipModel.yAlign);
    } else {
      tooltipEl.classList.add('no-transform');
    }

    // Set Text
    if (tooltipModel.body) {
      const titleLines = tooltipModel.title || [];
      const bodyLines = tooltipModel.body.map(getBody);

      let innerHtml = '<thead>';

      titleLines.forEach(function (title) {
        innerHtml += `<div class='tooltip-title'>${title}</div>`;
      });
      innerHtml += '</thead><tbody>';

      bodyLines.forEach(function (body, i) {
        const colors = tooltipModel.labelColors[i];
        let style = `background:${colors.backgroundColor}`;
        style += `; border-color:${colors.borderColor}`;
        style += '; border-width: 2px';
        style += '; border-radius: 30px';
        const span = `<span class="chartjs-tooltip-key" style="${style}"></span>`;
        innerHtml += `<tr><td>${span}${body}</td></tr>`;
      });

      innerHtml += '</tbody>';

      const tableRoot = tooltipEl.querySelector('table');
      tableRoot.innerHTML = innerHtml;
    }

    const positionY = context.chart.canvas.offsetTop;
    const positionX = context.chart.canvas.offsetLeft;
    const toolTip = document.querySelector('.chartjs-tooltip');
    const toolTipHeight = toolTip.clientHeight;

    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = `${positionX + tooltipModel.caretX}px`;
    tooltipEl.style.top = `${positionY + tooltipModel.caretY - (tooltipModel.caretY > 10 ? (toolTipHeight > 100 ? toolTipHeight + 5 : toolTipHeight + 15) : 70)}px`;
    tooltipEl.style.fontFamily = tooltipModel.options.bodyFontFamily;
    tooltipEl.style.fontSize = `${tooltipModel.options.bodyFontSize}px`;
    tooltipEl.style.fontStyle = tooltipModel.options.bodyFontStyle;
    tooltipEl.style.padding = `${tooltipModel.yPadding}px ${tooltipModel.xPadding}px`;
  }
};
