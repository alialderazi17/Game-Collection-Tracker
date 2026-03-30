const createReview = async (req,res)=>{
  try {
    req.body.user=req.session.user._id
    req.body.game =req.params.gameId

    const newReview = await Review.create(
      req.body )
await Game.findByIdAndUpdate(
  req.params.gameId,{
    $push:{
      reviews:newReview._id
    }
  }
)
res.send(newReview)
  } catch (error) {
console.log('error creating review')
  }
}

const deleteReview = async(req,res)=> {
  try {
    await Review.findByIdAndDelete(
      req.params.reviewId
    )
res.send("Review deleted")
  } catch (error) {
console.log(error)
res.send("error deleting review")
  }
}
module.exports={ createReview, deleteReview}
