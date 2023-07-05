// by  Sohail Mehra and Noland Chaliha
const D = require('Diagnostics');
const S = require('Shaders');
const Tex = require('Textures');
const R = require('Reactive');
const M = require('Materials');

Promise.all([
	Tex.findFirst('cameraTexture0'),
    M.findFirst('user_mat'),
]).then(onReady);

function onReady(assets) {
    const diffuse = assets[0];
    const defaultMaterial = assets[1];
    const diffuseTexture = diffuse.signal;

    const vtx_uv = S.vertexAttribute({ variableName: S.VertexAttribute.TEX_COORDS });
    const vtx_plus_one = R.add(vtx_uv, R.pack2(1,1)); // runs in vtx shader
    const frag_uv = S.fragmentStage(vtx_uv);
    const frag_plus_one = R.add(frag_uv, R.pack2(1,1)); // runs in fragment shader
    const diffuseColor = S.textureSampler(diffuseTexture, vtx_uv);

    // sm - composition
    // const func_uv = S.functionVec2();
    // const func_plus_one = R.add(func_uv, R.pack2(1,1)); //runs in fragment shader 
    // const diffuseColor = S.composition(diffuseTexture, func_uv); //order of samples determined by chain usage

    // sm - material
    const diffuseTexSlot = S.DefaultMaterialTextures.DIFFUSE;
    defaultMaterial.setTextureSlot(diffuseTexSlot, diffuseColor);
}

// by  Sohail Mehra and Noland Chaliha