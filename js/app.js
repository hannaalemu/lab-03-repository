function startApp() {
  loadData();
  attachListeners();

}

function loadData() {

  const success = retrievedInfo => displayPage(retrievedInfo);

  $.get('./data/page-1.json', data => {
    if (data.length) {
      success(data);
    } else {
      console.log('something went wrong with $.get');
    }
  }, 'json');
}

function displayPage(data) {
  const keywordArr = [];


  //if title
  // data.sort((a,b) => {
  //   if (a.title > b.title) return 1;
  //   if (b.title > a.title) return -1;
  //   return 0;
  // });

  //if horns
  // data.sort( (a,b) => a.horns - b.horns );


  data.forEach(element => {

    let template = $('#photoScript').html();
    let templateScript = Handlebars.compile(template);
    let context = { 'keyword' : element.keyword, 'title' : element.title, 'image_url' : element.image_url, 'description' : element.description };
    let html = templateScript(context);

    $('main').append(html);

    if (!keywordArr.includes(element.keyword)) {
      keywordArr.push(element.keyword);
    }

  });

  keywordArr.forEach(element => {
    const $newOption = $('#option-template').clone();
    $newOption.text(element);
    $newOption.attr('value', element);

    $('select').append($newOption);
  });
}


function attachListeners() {
  $('select').on('change', event => {
    const $choice = $(event.target).val();
    console.log($choice);

    if ($choice === 'default') {
      $('.photo-class').show();
    } else {
      $('.photo-class').hide();
      $('.photo-class[data-keyword="' + $choice + '"]').show();
    }

  });
}

$(startApp);


