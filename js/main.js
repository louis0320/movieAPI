let target_id = 0;
/** API **/
$(function () {
  console.log("시작");
  $.ajax({
    url: "https://api.themoviedb.org/3/movie/popular?api_key=10923b261ba94d897ac6b81148314a3f&page=1",
    data: {},
    type: "GET",
    success: function (json) {
      console.log(json);
      $("#movie-list").html('')
      let movie_list = json.results;
      for (let i = 0; i < movie_list.length; i++) {
        let card = `<div class="col mb-4">
        <div class="card">
          <img src="${`https://image.tmdb.org/t/p/w500`+movie_list[i].poster_path}" alt="" />
          <div class="card-body">
            <h5 class="card-title">${movie_list[i].original_title}</h5>
            <button type="button" class="btn btn-success" 
                    id="review-button" onclick="review(${movie_list[i].id})"
            >
              리뷰보기
            </button>
          </div>
        </div>
      </div>`
      $("#movie-list").append(card)
      }
    },
    error: function (err) {},
  });
});

/** 모달창 **/
var myModal = new bootstrap.Modal(
  document.getElementById("review-modal"),
  "show"
);
function review(id) {
  target_id = id;
  $.ajax({
    url:`http://universeapi.net/review/list?movie_id=${id}`,
    data:{},
    type:"GET",
    success:function(json) {
      console.log(json.data)
      let reviews = json.data;
      $(".modal-body").html('')
      for(let i =0; i<reviews.length; i++) {
        $(".modal-body").append(`<p>${reviews[i].review}</p>`)
      }
    }
  })
  myModal.show();
}

function addReview() {
  let review = $("#review").val();
  let review_html = `<p>${review}</p>`

  $.ajax({
    url:`http://universeapi.net/review/add`,
    data: {
      movie_id:target_id,
      review:review
    },
    type:"POST",
    success:function(json){
      console.log(json)
    }
  })

  $(".modal-body").append(review_html);
  $("#review").val();
}