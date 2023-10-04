AFRAME.registerComponent("ball", {
  init: function () {
    this.shoot();
  },

  shoot: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "s") {
      
        const ballEl = document.createElement("a-entity");
        
        ballEl.setAttribute("gltf-model", 'assets/models/bowling_ball/scene.gltf');
        ballEl.setAttribute('scale',{x:3,y:3,z:3})
        ballEl.addEventListener('collide',this.removeBall)
        
        var camera = document.querySelector('#camera')
        var pos = camera.getAttribute('position')
        ballEl.setAttribute('position',pos)
        ballEl.setAttribute('dynamic-body',{
          shape:'sphere',
          mass: 0 
        })

        var camera = document.querySelector('#camera').object3D
        var direction = new THREE.Vector3();
        camera.getWorldDirection(direction) 
        ballEl.setAttribute('velocity',direction.multiplyScalar(-10))

        var scene = document.querySelector('#scene')
        scene.appendChild(ballEl)
        
      }
    });
  },
  removeBall:function(e){
    var element = e.detail.target.el
    var elementHit = e.detail.body.el

    if(elementHit.id.includes('pin')){
      console.log('hello')
      var impulse = new CANNON.Vec3(0,1,-15)
      var worldPoint = new CANNON.Vec3().copy(elementHit.getAttribute('position'));

      elementHit.body.applyForce(impulse,worldPoint)

      element.removeEventListener('collide',this.removeBall);

      var scene = document.querySelector('#scene');
      scene.removeChild(element)
    }
  }
});
