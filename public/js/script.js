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

  $('.Playlist').find('.active').removeClass('active')

  $(this).addClass('active')

  $.get('/video/getPlayer/' + $(this).data('id'), function(data) {
    $('#Player').html(JSON.parse(data).video)
    dynamicVideo()
  })
})
