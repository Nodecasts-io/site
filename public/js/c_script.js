function dynamicVideo() {
  // Find all YouTube videos
  var $allVideos = $("iframe[src^='//www.youtube.com']"), $fluidEl = $(".Video")

  // Figure out and save aspect ratio for each video
  $allVideos.each(function() {
    $(this).data('aspectRatio', this.height / this.width)

    // and remove the hard coded width/height
    .removeAttr('height')
    .removeAttr('width')
  })

  // When the window is resized
  $(window).resize(function() {
    var newWidth = $fluidEl.width()

    // Resize all videos according to their own aspect ratio
    $allVideos.each(function() {
      var $el = $(this)
      $el.width(newWidth).height(newWidth * $el.data('aspectRatio'))
    })
  }).resize()
}

dynamicVideo()

$('.Playlist').find('.list-group-item').first().addClass('active')

$('.Playlist-Video').on('click', function(e) {
  e.preventDefault()

  const videoUrl = '/video/getPlayer/' + $(this).data('id')

  markLinkAsVisited('/video/' + $(this).data('id'))

  $('.Playlist').find('.active').removeClass('active')

  $(this).addClass('active')

  $.get(videoUrl, function(data) {
    // JSON parse data
    var video = JSON.parse(data)

    // Change document title to new video title
    document.title = video.title

    // Change embedded player to new video
    $('#Player').html(video.video)

    // Recalculate size for video
    dynamicVideo()
  })
})

function markLinkAsVisited(videoUrl) {
  const fullUrl = window.location.origin + videoUrl;

  // store the current URL
  const current_url = window.location.href

  // use replaceState to push a new entry into the browser's history
  window.history.replaceState({}, "", fullUrl)

  // use replaceState again to reset the URL
  window.history.replaceState({}, "", current_url)
}
