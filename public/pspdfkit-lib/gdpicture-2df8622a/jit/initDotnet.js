import { dotnet } from './dotnet.js';
export async function initDotnet(t) {
  if (null === t || 'string' != typeof t || 0 === t.trim().length)
    throw Error('`baseUrl` must be a string passed to `initDotnet` and be non-empty.');
  const {
    getAssemblyExports: e,
    getConfig: i,
    Module: o
  } = await dotnet.withModuleConfig({ locateFile: (e) => `${t}/${e}` }).create();
  globalThis.gdPicture = { module: o, baseUrl: t };
  const n = await e(i().mainAssemblyName);
  return await n.GdPictureWasm.API.Initialize(), { Assemblies: n, Module: o, BaseUrl: t };
}
