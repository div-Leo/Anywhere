import { TweenMax, Elastic } from 'gsap';

export default {
  fadeInClouds(target, cb){
    return TweenMax
      .from(target, 1, {
        opacity: 0,
        ease: Elastic.easeOut.config(0.25, 1)
      })
  },
  fadeOutClouds(target, cb){
    return TweenMax
      .to(target, 1, {
        opacity: 0,
        ease: Elastic.easeOut.config(0.25, 1)
      })
  },
  titleTransition(target, cb){
    return TweenMax
      .from(target, 1.5, {
        transform: 'translateY(300px)',
        opacity: 0,
        ease: Elastic.easeOut.config(0.25, 1)
      })
  },
}
