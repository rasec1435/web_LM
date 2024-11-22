console.clear();

var _data = '';
var currentLineIndex = -1; // Mantener el índice de la línea actual
mounted();

async function setLyric(language = 'es') {
  await fetch(`./lyric_${language}.json`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((result) => {
      _data = result;
      console.log(_data);
      generate(); // Generar la transcripción después de cargar los datos
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

$(document).ready(function () {
  $('video').on('timeupdate', function (e) {
    var time = this.currentTime * 1000;

    // Buscar el segmento que corresponde al tiempo actual
    var newIndex = _data['segments'].findIndex(function (item) {
      return time >= item.start * 1000 && time < item.end * 1000;
    });

    // Si la línea actual ha cambiado, actualizar el resaltado
    if (newIndex !== currentLineIndex && newIndex !== -1) {
      currentLineIndex = newIndex;
      $('.lyrics div').removeClass('highlighted');
      $(`.lyrics div:nth-child(${newIndex + 1})`).addClass('highlighted');
      align();
    }
  });

  // Asegurarse de que la primera línea esté resaltada al inicio
  $('video').on('play', function () {
    if (this.currentTime === 0) {
      currentLineIndex = 0;
      $('.lyrics div').removeClass('highlighted');
      $('.lyrics div:nth-child(1)').addClass('highlighted');
    }
  });

  // Cambio de idioma
  $('#language').on('change', function () {
    const selectedLanguage = $(this).val();
    setLyric(selectedLanguage);
  });
});

function align() {
  var highlighted = $('.highlighted');
  if (highlighted.length) {
    var container = $('.lyrics-section');
    var scrollPosition = highlighted.offset().top - container.offset().top + container.scrollTop() - container.height() / 2 + highlighted.height() / 2;
    container.animate(
      { scrollTop: scrollPosition },
      { easing: 'swing', duration: 250 }
    );
  }
}

function generate() {
  var html = '';
  console.log(_data);
  for (var i = 0; i < _data['segments'].length; i++) {
    html += '<div';
    if (i == 0) {
      html += ` class="highlighted"`;
      currentLineIndex = 0;
    }
    if (_data['segments'][i]['note']) {
      html += ` note="${_data['segments'][i]['note']}"`;
    }
    html += '>';
    html += _data['segments'][i]['text'] == '' ? '•' : _data['segments'][i]['text'];
    html += '</div>';
  }
  $('.lyrics').html(html);
  align();
}

async function mounted() {
  await setLyric();
}
