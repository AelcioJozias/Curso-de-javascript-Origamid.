export default function initToolTip() {
  
}

const tooltips = document.querySelectorAll('[data-tooltip]')

tooltips.forEach(tooltip => {
  tooltip.addEventListener('mouseover', onMouseOver)
})


function onMouseOver(event) {
  const tooltipBox = criarToolTip(this);
  calcTooltipPosition(tooltipBox, event.pageY, event.pageX)
  onMouseLeave.tooltipBox = tooltipBox
  onMouseLeave.element = this
  this.addEventListener('mouseleave', onMouseLeave);

  this.addEventListener('mousemove', onMouseMove)
  onMouseMove.tooltipBox = tooltipBox
  
}

const onMouseMove = {
  tooltipBox: '',
  handleEvent(event) {
    calcTooltipPosition(this.tooltipBox, event.pageY, event.pageX)
  }
}

function calcTooltipPosition(element, pageY, pageX) {
  element.style.top  = pageY -70 + 'px';
  element.style.left = pageX -70 + 'px';
}

const onMouseLeave = {
  tooltipBox: '',
  element: '',
  handleEvent() {
    this.tooltipBox.remove();
    this.element.removeEventListener('mouseleave', onMouseLeave);
    this.element.removeEventListener('mousemove', onMouseMove);
  }
}


function criarToolTip(element) {
  const tooltipBox = document.createElement('div');
  const text = element.getAttribute('aria-label');
  tooltipBox.classList.add('tooltip');
  tooltipBox.innerHTML = text;
  document.querySelector('body').appendChild(tooltipBox);
  return tooltipBox;
}