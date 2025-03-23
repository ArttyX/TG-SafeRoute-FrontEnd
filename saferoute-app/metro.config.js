const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
	  
const config = getDefaultConfig(__dirname);
	  
module.exports = withNativeWind(config, { input: './global.css' }); 

module.exports = (async () => {
    const config = await getDefaultConfig(__dirname);
    config.resolver.assetExts.push('png'); // Adiciona suporte a imagens
    return config;
  })();