import { TweenMax, Elastic } from 'gsap';

export default {
  fadeInClouds(target, cb){
    console.log('passing here');
    return TweenMax
      .from(target, 1, {
        opacity: 0,
        // transform: 'translateY(900px) scale(0)',
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
    console.log(target);
    return TweenMax
      .from(target, 1.5, {
        transform: 'translateY(300px)',
        opacity: 0,
        ease: Elastic.easeOut.config(0.25, 1)
      })
  },
}
