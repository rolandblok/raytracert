
function make_test_cube(A, B) {
    let three_scene = new THREE.Scene()
    let texture = new Texture("#ffffff", "#ffffff",  false)
    return cube = new Cube(1, three_scene, A, B, texture)

}

// test x front and back for hit and miss
QUnit.test( "cube hit xf", function( assert ) {
    let A = new THREE.Vector3(0, 0, 0)
    let B = new THREE.Vector3(1, 1, 1)
    let cube = make_test_cube(A, B)
    let ra = new THREE.Vector3(2,   0.5, 0.5)
    let rb = new THREE.Vector3(0.5, 0.5, 0.5)
    let ray = new Ray(ra, rb)
    let labda = cube.hit(ray)
    assert.notEqual(undefined, labda, 'hit xf')
});
QUnit.test( "cube no hit xf", function( assert ) {
    let A = new THREE.Vector3(0, 0, 0)
    let B = new THREE.Vector3(1, 1, 1)
    let cube = make_test_cube(A, B)
    let ra = new THREE.Vector3(  2, 1.5, 0.5)
    let rb = new THREE.Vector3(0.5, 1.5, 0.5)
    let ray = new Ray(ra, rb)
    let labda = cube.hit(ray)
    assert.equal(undefined, labda, 'no hit xf')
});
QUnit.test( "cube hit xb", function( assert ) {
    let A = new THREE.Vector3(0, 0, 0)
    let B = new THREE.Vector3(1, 1, 1)
    let cube = make_test_cube(A, B)
    let ra = new THREE.Vector3( -2, 0.5, 0.5)
    let rb = new THREE.Vector3(0.5, 0.5, 0.5)
    let ray = new Ray(ra, rb)
    let labda = cube.hit(ray)
    assert.notEqual(undefined, labda, 'hit xb')
});
QUnit.test( "cube no hit xb", function( assert ) {
    let A = new THREE.Vector3(0, 0, 0)
    let B = new THREE.Vector3(1, 1, 1)
    let cube = make_test_cube(A, B)
    let ra = new THREE.Vector3(-2,   1.5, 0.5)
    let rb = new THREE.Vector3( 0.5, 1.5, 0.5)
    let ray = new Ray(ra, rb)
    let labda = cube.hit(ray)
    assert.equal(undefined, labda, 'hit xb')
});

// test y front and back for hit and miss
QUnit.test( "cube hit yf", function( assert ) {
    let A = new THREE.Vector3(0, 0, 0)
    let B = new THREE.Vector3(1, 1, 1)
    let cube = make_test_cube(A, B)
    let ra = new THREE.Vector3(0.5, 2.0, 0.5)
    let rb = new THREE.Vector3(0.5, 0.5, 0.5)
    let ray = new Ray(ra, rb)
    let labda = cube.hit(ray)
    assert.notEqual(undefined, labda, 'hit yf')
});
QUnit.test( "cube no hit yf", function( assert ) {
    let A = new THREE.Vector3(0, 0, 0)
    let B = new THREE.Vector3(1, 1, 1)
    let cube = make_test_cube(A, B)
    let ra = new THREE.Vector3(1.5, 2.0, 0.5)
    let rb = new THREE.Vector3(1.5, 0.5, 0.5)
    let ray = new Ray(ra, rb)
    let labda = cube.hit(ray)
    assert.equal(undefined, labda, 'no hit yf')
});
QUnit.test( "cube hit yb", function( assert ) {
    let A = new THREE.Vector3(0, 0, 0)
    let B = new THREE.Vector3(1, 1, 1)
    let cube = make_test_cube(A, B)
    let ra = new THREE.Vector3(0.5, -2.0, 0.5)
    let rb = new THREE.Vector3(0.5,  0.5, 0.5)
    let ray = new Ray(ra, rb)
    let labda = cube.hit(ray)
    assert.notEqual(undefined, labda, 'hit yb')
});
QUnit.test( "cube no hit yb", function( assert ) {
    let A = new THREE.Vector3(0, 0, 0)
    let B = new THREE.Vector3(1, 1, 1)
    let cube = make_test_cube(A, B)
    let ra = new THREE.Vector3(1.5, -2.0, 0.5)
    let rb = new THREE.Vector3(1.5,  0.5, 0.5)
    let ray = new Ray(ra, rb)
    let labda = cube.hit(ray)
    assert.equal(undefined, labda, 'hit yb')
});

// test z front and back for hit and miss
QUnit.test( "cube hit zf", function( assert ) {
    let A = new THREE.Vector3(0, 0, 0)
    let B = new THREE.Vector3(1, 1, 1)
    let cube = make_test_cube(A, B)
    let ra = new THREE.Vector3(0.5, 0.5, 2.0)
    let rb = new THREE.Vector3(0.5, 0.5, 0.5)
    let ray = new Ray(ra, rb)
    let labda = cube.hit(ray)
    assert.notEqual(undefined, labda, 'hit yf')
});
QUnit.test( "cube no hit zf", function( assert ) {
    let A = new THREE.Vector3(0, 0, 0)
    let B = new THREE.Vector3(1, 1, 1)
    let cube = make_test_cube(A, B)
    let ra = new THREE.Vector3(1.5, 0.5, 2.0)
    let rb = new THREE.Vector3(1.5, 0.5, 0.5)
    let ray = new Ray(ra, rb)
    let labda = cube.hit(ray)
    assert.equal(undefined, labda, 'no hit yf')
});
QUnit.test( "cube hit zb", function( assert ) {
    let A = new THREE.Vector3(0, 0, 0)
    let B = new THREE.Vector3(1, 1, 1)
    let cube = make_test_cube(A, B)
    let ra = new THREE.Vector3(0.5, 0.5, -2.0)
    let rb = new THREE.Vector3(0.5, 0.5,  0.5)
    let ray = new Ray(ra, rb)
    let labda = cube.hit(ray)
    assert.notEqual(undefined, labda, 'hit yb')
});
QUnit.test( "cube no hit zb", function( assert ) {
    let A = new THREE.Vector3(0, 0, 0)
    let B = new THREE.Vector3(1, 1, 1)
    let cube = make_test_cube(A, B)
    let ra = new THREE.Vector3(1.5, 0.5, -2.0)
    let rb = new THREE.Vector3(1.5, 0.5,  0.5)
    let ray = new Ray(ra, rb)
    let labda = cube.hit(ray)
    assert.equal(undefined, labda, 'hit yb')
});
