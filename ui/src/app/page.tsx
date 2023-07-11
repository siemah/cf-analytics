import getGeolocation from "@/services/geolocation/index.ts";
import getGlobalStats from "@/services/global-stats";
import getTechnologies from "@/services/technologies";
import Image from "next/image";

export const runtime = "edge";
export default async function Home() {
  const { globalStats = {} } = await getGlobalStats();
  const { geolocation: countries } = await getGeolocation();
  const { technologies } = await getTechnologies();

  return (
    <div className="flex flex-col gap-6">
      {/* Global stats */}
      <div className="flex gap-6 items-center justify-center">
        <div className="bg-white rounded-3xl border py-8 px-6 w-3/6">
          <div className="flex justify-between items-center mb-4">
            <span className="inline-flex items-center justify-center w-14 h-14 text-blue-100 bg-gradient-to-r from-yellow-400 to-green-500 rounded-full">
              <svg stroke="currentColor" fill="#FFFFFF" strokeWidth="20" viewBox="0 0 1024 1024" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"></path></svg>
            </span>
            <div>
              <span className="font-bold text-green-500">+ 726 (15%)</span><br />
              <span className="font-medium text-xs text-gray-500 flex justify-end">0.382 coin</span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-gray-400">Visits</h3>
            <h1 className="font-semibold text-xl text-gray-700">{globalStats?.visitors}</h1>
          </div>
        </div>
        <div className="bg-white rounded-3xl border py-8 px-6 w-3/6">
          <div className="flex justify-between items-center mb-4">
            <span className="inline-flex items-center justify-center w-14 h-14 text-blue-100 bg-gradient-to-r from-green-400 to-blue-500 rounded-full">
              <svg stroke="currentColor" fill="#FFFFFF" strokeWidth="0" viewBox="0 0 512 512" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M189.37,152.86Zm-58.74-29.37C130.79,123.5,130.71,123.5,130.63,123.49Zm351.42,45.35c-10.61-25.5-32.08-53-48.94-61.73,13.72,26.89,21.67,53.88,24.7,74,0,0,0,.14.05.41-27.58-68.75-74.35-96.47-112.55-156.83-1.93-3.05-3.86-6.11-5.74-9.33-1-1.65-1.86-3.34-2.69-5.05A44.88,44.88,0,0,1,333.24.69a.63.63,0,0,0-.55-.66.9.9,0,0,0-.46,0l-.12.07-.18.1.1-.14c-54.23,31.77-76.72,87.38-82.5,122.78a130,130,0,0,0-48.33,12.33,6.25,6.25,0,0,0-3.09,7.75,6.13,6.13,0,0,0,7.79,3.79l.52-.21a117.84,117.84,0,0,1,42.11-11l1.42-.1c2-.12,4-.2,6-.22A122.61,122.61,0,0,1,291,140c.67.2,1.32.42,2,.63,1.89.57,3.76,1.2,5.62,1.87,1.36.5,2.71,1,4.05,1.58,1.09.44,2.18.88,3.25,1.35q2.52,1.13,5,2.35c.75.37,1.5.74,2.25,1.13q2.4,1.26,4.74,2.63,1.51.87,3,1.8a124.89,124.89,0,0,1,42.66,44.13c-13-9.15-36.35-18.19-58.82-14.28,87.74,43.86,64.18,194.9-57.39,189.2a108.43,108.43,0,0,1-31.74-6.12c-2.42-.91-4.8-1.89-7.16-2.93-1.38-.63-2.76-1.27-4.12-2C174.5,346,149.9,316.92,146.83,281.59c0,0,11.25-41.95,80.62-41.95,7.5,0,28.93-20.92,29.33-27-.09-2-42.54-18.87-59.09-35.18-8.85-8.71-13.05-12.91-16.77-16.06a69.58,69.58,0,0,0-6.31-4.77A113.05,113.05,0,0,1,173.92,97c-25.06,11.41-44.55,29.45-58.71,45.37h-.12c-9.67-12.25-9-52.65-8.43-61.08-.12-.53-7.22,3.68-8.15,4.31a178.54,178.54,0,0,0-23.84,20.43A214,214,0,0,0,51.9,133.36l0,0a.08.08,0,0,1,0,0,205.84,205.84,0,0,0-32.73,73.9c-.06.27-2.33,10.21-4,22.48q-.42,2.87-.78,5.74c-.57,3.69-1,7.71-1.44,14,0,.24,0,.48-.05.72-.18,2.71-.34,5.41-.49,8.12,0,.41,0,.82,0,1.24,0,134.7,109.21,243.89,243.92,243.89,120.64,0,220.82-87.58,240.43-202.62.41-3.12.74-6.26,1.11-9.41,4.85-41.83-.54-85.79-15.82-122.55Z"></path></svg>
            </span>
            <div>
              <span className="font-bold text-green-500">+ $726 (15%)</span><br />
              <span className="font-medium text-xs text-gray-500 flex justify-end">0.382 coin</span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-gray-400">Top Browser</h3>
            <h1 className="font-semibold text-xl text-gray-700">{globalStats?.browser}</h1>
          </div>
        </div>
        <div className="bg-white rounded-3xl border py-8 px-6 w-3/6">
          <div className="flex justify-between items-center mb-4">
            <button className="inline-flex items-center justify-center w-14 h-14 text-blue-100 bg-gradient-to-r from-blue-400 to-red-500 rounded-full">
              <svg stroke="#ffffff" fill="#ffffff" strokeWidth="0" viewBox="0 0 24 24" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="ffffff" strokeWidth="2" d="M1,19 L23,19 L23,1 L1,1 L1,19 Z M5,23 L19,23 L5,23 Z M8,23 L16,23 L16,19 L8,19 L8,23 Z M7.757,5.757 L9.879,7.879 L7.757,5.757 Z M9,10 L6,10 L9,10 Z M9.879,12.121 L7.757,14.243 L9.879,12.121 Z M12,13 L12,16 L12,13 Z M14.121,12.121 L16.243,14.243 L14.121,12.121 Z M18,10 L15,10 L18,10 Z M16.243,5.757 L14.121,7.879 L16.243,5.757 Z M12,7 L12,4 L12,7 Z M12,7 C10.343,7 9,8.343 9,10 C9,11.657 10.343,13 12,13 C13.657,13 15,11.657 15,10 C15,8.343 13.657,7 12,7 L12,7 Z"></path></svg>
            </button>
            <div>
              <span className="font-bold text-green-500">+ $726 (15%)</span><br />
              <span className="font-medium text-xs text-gray-500 flex justify-end">0.382 coin</span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-gray-400">Top Os</h3>
            <h1 className="font-semibold text-xl text-gray-700">{globalStats?.os}</h1>
          </div>
        </div>
        <div className="bg-white rounded-3xl border py-8 px-6 w-3/6">
          <div className="flex justify-between items-center mb-4">
            <button className="inline-flex items-center justify-center w-14 h-14 text-blue-100 bg-gradient-to-r from-green-300 to-green-700 rounded-full">
              <svg stroke="currentColor" fill="#FFFFFF" strokeWidth="0" viewBox="0 0 16 16" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM3.668 2.501l-.288.646a.847.847 0 0 0 1.479.815l.245-.368a.809.809 0 0 1 1.034-.275.809.809 0 0 0 .724 0l.261-.13a1 1 0 0 1 .775-.05l.984.34c.078.028.16.044.243.054.784.093.855.377.694.801-.155.41-.616.617-1.035.487l-.01-.003C8.274 4.663 7.748 4.5 6 4.5 4.8 4.5 3.5 5.62 3.5 7c0 1.96.826 2.166 1.696 2.382.46.115.935.233 1.304.618.449.467.393 1.181.339 1.877C6.755 12.96 6.674 14 8.5 14c1.75 0 3-3.5 3-4.5 0-.262.208-.468.444-.7.396-.392.87-.86.556-1.8-.097-.291-.396-.568-.641-.756-.174-.133-.207-.396-.052-.551a.333.333 0 0 1 .42-.042l1.085.724c.11.072.255.058.348-.035.15-.15.415-.083.489.117.16.43.445 1.05.849 1.357L15 8A7 7 0 1 1 3.668 2.501Z"></path></svg>
            </button>
            <div>
              <span className="font-bold text-green-500">+ $726 (15%)</span><br />
              <span className="font-medium text-xs text-gray-500 flex justify-end">0.382 coin</span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-gray-400">Top Country</h3>
            <h1 className="font-semibold text-xl text-gray-700">{globalStats?.country}</h1>
          </div>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* User locations */}
        <div className="md:col-span-2 lg:col-span-1">
          {/* <!-- component --> */}
          <section className="antialiased text-gray-600">
            <div className="flex flex-col h-full">
              {/* <!-- Table --> */}
              <div className="w-full bg-white rounded-xl border border-gray-200">
                <header className="px-5 py-4 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-800">Top Countries</h2>
                </header>
                <div className="p-3">
                  <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                      <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                        <tr>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">Name</div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-right">Visits</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-sm divide-y divide-gray-100">
                        {
                          countries.map((country: Record<string, string>) => (
                            <tr key={`country-stat-item-${country.name}`}>
                              <td className="p-2 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="relative w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                    <Image
                                      className="rounded-full object-cover outline outline-2 outline-offset-2 outline-blue-500"
                                      src={`https://flagcdn.com/h60/${country.name?.toLowerCase()}.png`}
                                      alt={country.name}
                                      priority={false}
                                      unoptimized
                                      fill
                                    />
                                  </div>
                                  <div className="font-medium text-gray-800">
                                    {country?.name}
                                  </div>
                                </div>
                              </td>
                              <td className="p-2 whitespace-nowrap">
                                <div className="text-right font-lg font-semibold">{country.total}</div>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="md:col-span-2 lg:col-span-1">
          <div className="h-full py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-white">
            <svg className="w-40 m-auto opacity-75" viewBox="0 0 146 146" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M73.1866 5.7129C81.999 5.7129 90.725 7.44863 98.8666 10.821C107.008 14.1933 114.406 19.1363 120.637 25.3675C126.868 31.5988 131.811 38.9964 135.184 47.138C138.556 55.2796 140.292 64.0057 140.292 72.818C140.292 81.6304 138.556 90.3565 135.184 98.4981C131.811 106.64 126.868 114.037 120.637 120.269C114.406 126.5 107.008 131.443 98.8666 134.815C90.725 138.187 81.999 139.923 73.1866 139.923C64.3742 139.923 55.6481 138.187 47.5066 134.815C39.365 131.443 31.9674 126.5 25.7361 120.269C19.5048 114.037 14.5619 106.64 11.1895 98.4981C7.81717 90.3565 6.08144 81.6304 6.08144 72.818C6.08144 64.0057 7.81717 55.2796 11.1895 47.138C14.5619 38.9964 19.5048 31.5988 25.7361 25.3675C31.9674 19.1363 39.365 14.1933 47.5066 10.821C55.6481 7.44863 64.3742 5.7129 73.1866 5.7129L73.1866 5.7129Z"
                stroke="#e4e4f2" strokeWidth="4.89873" />
              <path
                d="M73.5 23.4494C79.9414 23.4494 86.3198 24.7181 92.2709 27.1831C98.222 29.6482 103.629 33.2612 108.184 37.816C112.739 42.3707 116.352 47.778 118.817 53.7291C121.282 59.6802 122.551 66.0586 122.551 72.5C122.551 78.9414 121.282 85.3198 118.817 91.2709C116.352 97.222 112.739 102.629 108.184 107.184C103.629 111.739 98.222 115.352 92.2709 117.817C86.3198 120.282 79.9414 121.551 73.5 121.551C67.0586 121.551 60.6802 120.282 54.7291 117.817C48.778 115.352 43.3707 111.739 38.816 107.184C34.2612 102.629 30.6481 97.222 28.1831 91.2709C25.7181 85.3198 24.4494 78.9414 24.4494 72.5C24.4494 66.0586 25.7181 59.6802 28.1831 53.7291C30.6481 47.778 34.2612 42.3707 38.816 37.816C43.3707 33.2612 48.778 29.6481 54.7291 27.1831C60.6802 24.7181 67.0586 23.4494 73.5 23.4494L73.5 23.4494Z"
                stroke="#e4e4f2" strokeWidth="4.89873" />
              <path
                d="M73 24C84.3364 24 95.3221 27.9307 104.085 35.1225C112.848 42.3142 118.847 52.322 121.058 63.4406C123.27 74.5592 121.558 86.1006 116.214 96.0984C110.87 106.096 102.225 113.932 91.7515 118.27C81.278 122.608 69.6243 123.181 58.7761 119.89C47.9278 116.599 38.5562 109.649 32.258 100.223C25.9598 90.7971 23.1248 79.479 24.2359 68.1972C25.3471 56.9153 30.3357 46.3678 38.3518 38.3518"
                stroke="url(#paint0_linear_622:13617)" strokeWidth="10" strokeLinecap="round" />
              <path
                d="M73 5.00001C84.365 5.00001 95.5488 7.84852 105.529 13.2852C115.509 18.7218 123.968 26.5732 130.131 36.1217C136.295 45.6702 139.967 56.6112 140.812 67.9448C141.657 79.2783 139.648 90.6429 134.968 101C130.288 111.357 123.087 120.375 114.023 127.232C104.96 134.088 94.3218 138.563 83.0824 140.248C71.8431 141.933 60.3606 140.775 49.6845 136.878C39.0085 132.981 29.4793 126.471 21.9681 117.942"
                stroke="url(#paint1_linear_622:13617)" strokeWidth="10" strokeLinecap="round" />
              <path
                d="M9.60279 97.5926C6.37325 89.2671 4.81515 80.3871 5.01745 71.4595C5.21975 62.5319 7.1785 53.7316 10.7818 45.561C14.3852 37.3904 19.5626 30.0095 26.0184 23.8398C32.4742 17.6701 40.082 12.8323 48.4075 9.6028"
                stroke="url(#paint2_linear_622:13617)" strokeWidth="10" strokeLinecap="round" />
              <path d="M73 5.00001C86.6504 5.00001 99.9849 9.10831 111.269 16.7904" stroke="url(#paint3_linear_622:13617)"
                strokeWidth="10" strokeLinecap="round" />
              <circle cx="73.5" cy="72.5" r="29" fill="#e4e4f2" stroke="#e4e4f2" />
              <path
                d="M74 82.8332C68.0167 82.8332 63.1666 77.9831 63.1666 71.9998C63.1666 66.0166 68.0167 61.1665 74 61.1665C79.9832 61.1665 84.8333 66.0166 84.8333 71.9998C84.8333 77.9831 79.9832 82.8332 74 82.8332ZM74 80.6665C76.2985 80.6665 78.5029 79.7534 80.1282 78.1281C81.7535 76.5028 82.6666 74.2984 82.6666 71.9998C82.6666 69.7013 81.7535 67.4969 80.1282 65.8716C78.5029 64.2463 76.2985 63.3332 74 63.3332C71.7014 63.3332 69.497 64.2463 67.8717 65.8716C66.2464 67.4969 65.3333 69.7013 65.3333 71.9998C65.3333 74.2984 66.2464 76.5028 67.8717 78.1281C69.497 79.7534 71.7014 80.6665 74 80.6665ZM70.75 67.6665H77.25L79.9583 71.4582L74 77.4165L68.0416 71.4582L70.75 67.6665ZM71.8658 69.8332L70.8691 71.2307L74 74.3615L77.1308 71.2307L76.1341 69.8332H71.8658Z"
                fill="#6A6A9F" />
              <defs>
                <linearGradient id="paint0_linear_622:13617" x1="45.9997" y1="19" x2="46.0897" y2="124.308"
                  gradientUnits="userSpaceOnUse">
                  <stop stopColor="#E323FF" />
                  <stop offset="1" stopColor="#7517F8" />
                </linearGradient>
                <linearGradient id="paint1_linear_622:13617" x1="1.74103e-06" y1="8.70228e-06" x2="6.34739e-08"
                  y2="140.677" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4DFFDF" />
                  <stop offset="1" stopColor="#4DA1FF" />
                </linearGradient>
                <linearGradient id="paint2_linear_622:13617" x1="36.4997" y1="5.07257e-06" x2="36.6213" y2="142.36"
                  gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FFD422" />
                  <stop offset="1" stopColor="#FF7D05" />
                </linearGradient>
                <linearGradient id="paint3_linear_622:13617" x1="1.74103e-06" y1="8.70228e-06" x2="6.34739e-08"
                  y2="140.677" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4DFFDF" />
                  <stop offset="1" stopColor="#4DA1FF" />
                </linearGradient>
              </defs>
            </svg>
            <div>
              <h5 className="text-xl text-gray-600 text-center">
                Browsers
              </h5>
              {/* <div className="mt-2 flex justify-center gap-4">
                <h3 className="text-3xl font-bold text-gray-700">$23,988</h3>
                <div className="flex items-end gap-1 text-green-500">
                  <svg className="w-3" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.00001 0L12 8H-3.05176e-05L6.00001 0Z" fill="currentColor" />
                  </svg>
                  <span>2%</span>
                </div>
              </div>
              <span className="block text-center text-gray-500">Compared to last week $13,988</span> */}
            </div>
            <table className="w-full text-gray-600">
              <tbody>
                {
                  technologies?.browsers?.map((browser: Record<string, string>, index: number) => (
                    <tr key={`technologie-browser-${index}-${browser?.name}`}>
                      <td className="py-2">{browser.name}</td>
                      <td className="text-gray-500">{browser.total}</td>
                      <td>
                        <svg className="w-16 ml-auto" viewBox="0 0 68 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect opacity="0.4" width="17" height="21" rx="1" fill="#e4e4f2" />
                          <rect opacity="0.4" x="19" width="14" height="21" rx="1" fill="#e4e4f2" />
                          <rect opacity="0.4" x="35" width="14" height="21" rx="1" fill="#e4e4f2" />
                          <rect opacity="0.4" x="51" width="17" height="21" rx="1" fill="#e4e4f2" />
                          <path
                            d="M0 7C8.62687 7 7.61194 16 17.7612 16C27.9104 16 25.3731 9 34 9C42.6269 9 44.5157 5 51.2537 5C57.7936 5 59.3731 14.5 68 14.5"
                            stroke="url(#paint0_linear_622:13631)" strokeWidth="2" strokeLinejoin="round" />
                          <defs>
                            <linearGradient id="paint0_linear_622:13631" x1="68" y1="7.74997" x2="1.69701" y2="8.10029"
                              gradientUnits="userSpaceOnUse">
                              <stop stopColor="#E323FF" />
                              <stop offset="1" stopColor="#7517F8" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div className="h-full py-6 px-6 rounded-xl border border-gray-200 bg-white">
            <h5 className="text-xl text-gray-700">Operation Systems</h5>
            {/* <div className="my-8">
              <h1 className="text-5xl font-bold text-gray-800">64,5%</h1>
              <span className="text-gray-500">Compared to last week $13,988</span>
            </div> */}
            <svg className="w-full" viewBox="0 0 218 69" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0 67.5C27.8998 67.5 24.6002 15 52.5 15C80.3998 15 77.1002 29 105 29C132.9 29 128.6 52 156.5 52C184.4 52 189.127 63.8158 217.027 63.8158"
                stroke="url(#paint0_linear_622:13664)" strokeWidth="3" strokeLinecap="round" />
              <path
                d="M0 67.5C27.2601 67.5 30.7399 31 58 31C85.2601 31 80.7399 2 108 2C135.26 2 134.74 43 162 43C189.26 43 190.74 63.665 218 63.665"
                stroke="url(#paint1_linear_622:13664)" strokeWidth="3" strokeLinecap="round" />
              <defs>
                <linearGradient id="paint0_linear_622:13664" x1="217.027" y1="15" x2="7.91244" y2="15"
                  gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4DFFDF" />
                  <stop offset="1" stopColor="#4DA1FF" />
                </linearGradient>
                <linearGradient id="paint1_linear_622:13664" x1="218" y1="18.3748" x2="5.4362" y2="18.9795"
                  gradientUnits="userSpaceOnUse">
                  <stop stopColor="#E323FF" />
                  <stop offset="1" stopColor="#7517F8" />
                </linearGradient>
              </defs>
            </svg>
            <table className="mt-6 -mb-2 w-full text-gray-600">
              <tbody>
                {
                  technologies?.os?.map((os: Record<string, string>, index: number) => (
                    <tr key={`technologie-os-item-${index}-${os.name}`}>
                      <td className="py-2">{os.name}</td>
                      <td className="text-gray-500">{os.total}</td>
                      <td>
                        <svg className="w-16 ml-auto" viewBox="0 0 68 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect opacity="0.4" width="17" height="21" rx="1" fill="#e4e4f2" />
                          <rect opacity="0.4" x="19" width="14" height="21" rx="1" fill="#e4e4f2" />
                          <rect opacity="0.4" x="35" width="14" height="21" rx="1" fill="#e4e4f2" />
                          <rect opacity="0.4" x="51" width="17" height="21" rx="1" fill="#e4e4f2" />
                          <path
                            d="M0 7C8.62687 7 7.61194 16 17.7612 16C27.9104 16 25.3731 9 34 9C42.6269 9 44.5157 5 51.2537 5C57.7936 5 59.3731 14.5 68 14.5"
                            stroke="url(#paint0_linear_622:13631)" strokeWidth="2" strokeLinejoin="round" />
                          <defs>
                            <linearGradient id="paint0_linear_622:13631" x1="68" y1="7.74997" x2="1.69701" y2="8.10029"
                              gradientUnits="userSpaceOnUse">
                              <stop stopColor="#E323FF" />
                              <stop offset="1" stopColor="#7517F8" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </td>
                    </tr>
                  ))
                }
                {/* <tr>
                  <td className="py-2">From old users</td>
                  <td className="text-gray-500">1200</td>
                  <td>
                    <svg className="w-16 ml-auto" viewBox="0 0 68 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect opacity="0.4" width="17" height="21" rx="1" fill="#e4e4f2" />
                      <rect opacity="0.4" x="19" width="14" height="21" rx="1" fill="#e4e4f2" />
                      <rect opacity="0.4" x="35" width="14" height="21" rx="1" fill="#e4e4f2" />
                      <rect opacity="0.4" x="51" width="17" height="21" rx="1" fill="#e4e4f2" />
                      <path
                        d="M0 12.929C8.69077 12.929 7.66833 9.47584 17.8928 9.47584C28.1172 9.47584 25.5611 15.9524 34.2519 15.9524C42.9426 15.9524 44.8455 10.929 51.6334 10.929C58.2217 10.929 59.3092 5 68 5"
                        stroke="url(#paint0_linear_622:13640)" strokeWidth="2" strokeLinejoin="round" />
                      <defs>
                        <linearGradient id="paint0_linear_622:13640" x1="34" y1="5" x2="34" y2="15.9524"
                          gradientUnits="userSpaceOnUse">
                          <stop stopColor="#8AFF6C" />
                          <stop offset="1" stopColor="#02C751" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div className="lg:h-full py-8 px-6 text-gray-600 rounded-xl border border-gray-200 bg-white">
            <svg className="w-40 m-auto" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M27.9985 2.84071C31.2849 2.84071 34.539 3.488 37.5752 4.74562C40.6113 6.00324 43.3701 7.84657 45.6938 10.1703C48.0176 12.4941 49.861 15.2529 51.1186 18.289C52.3762 21.3252 53.0235 24.5793 53.0235 27.8657C53.0235 31.152 52.3762 34.4061 51.1186 37.4423C49.861 40.4785 48.0176 43.2372 45.6938 45.561C43.3701 47.8848 40.6113 49.7281 37.5752 50.9857C34.539 52.2433 31.2849 52.8906 27.9985 52.8906C24.7122 52.8906 21.4581 52.2433 18.4219 50.9857C15.3857 49.7281 12.627 47.8848 10.3032 45.561C7.97943 43.2372 6.1361 40.4785 4.87848 37.4423C3.62086 34.4061 2.97357 31.152 2.97357 27.8657C2.97357 24.5793 3.62086 21.3252 4.87848 18.289C6.13611 15.2529 7.97943 12.4941 10.3032 10.1703C12.627 7.84656 15.3857 6.00324 18.4219 4.74562C21.4581 3.488 24.7122 2.84071 27.9985 2.84071L27.9985 2.84071Z"
                stroke="#e4e4f2" strokeWidth="3" />
              <path
                d="M27.301 2.50958C33.0386 2.35225 38.6614 4.13522 43.26 7.57004C47.8585 11.0049 51.1637 15.8907 52.641 21.437C54.1182 26.9834 53.6811 32.8659 51.4002 38.133C49.1194 43.4001 45.1283 47.7437 40.0726 50.4611C35.0169 53.1785 29.1923 54.1108 23.541 53.1071C17.8897 52.1034 12.7423 49.2225 8.93145 44.9305C5.12062 40.6384 2.86926 35.1861 2.54159 29.4558C2.21391 23.7254 3.82909 18.0521 7.12582 13.3536"
                stroke="url(#paint0_linear_622:13696)" strokeWidth="5" strokeLinecap="round" />
              <path
                d="M13.3279 30.7467C13.3912 29.48 13.8346 28.5047 14.6579 27.8207C15.4939 27.124 16.5896 26.7757 17.9449 26.7757C18.8696 26.7757 19.6612 26.9404 20.3199 27.2697C20.9786 27.5864 21.4726 28.0234 21.8019 28.5807C22.1439 29.1254 22.3149 29.746 22.3149 30.4427C22.3149 31.2407 22.1059 31.9184 21.6879 32.4757C21.2826 33.0204 20.7949 33.3877 20.2249 33.5777V33.6537C20.9596 33.8817 21.5296 34.287 21.9349 34.8697C22.3529 35.4524 22.5619 36.1997 22.5619 37.1117C22.5619 37.8717 22.3846 38.5494 22.0299 39.1447C21.6879 39.74 21.1749 40.2087 20.4909 40.5507C19.8196 40.88 19.0089 41.0447 18.0589 41.0447C16.6276 41.0447 15.4622 40.6837 14.5629 39.9617C13.6636 39.2397 13.1886 38.1757 13.1379 36.7697H15.7219C15.7472 37.3904 15.9562 37.8907 16.3489 38.2707C16.7542 38.638 17.3052 38.8217 18.0019 38.8217C18.6479 38.8217 19.1419 38.6444 19.4839 38.2897C19.8386 37.9224 20.0159 37.4537 20.0159 36.8837C20.0159 36.1237 19.7752 35.579 19.2939 35.2497C18.8126 34.9204 18.0652 34.7557 17.0519 34.7557H16.5009V32.5707H17.0519C18.8506 32.5707 19.7499 31.969 19.7499 30.7657C19.7499 30.221 19.5852 29.7967 19.2559 29.4927C18.9392 29.1887 18.4769 29.0367 17.8689 29.0367C17.2736 29.0367 16.8112 29.2014 16.4819 29.5307C16.1652 29.8474 15.9816 30.2527 15.9309 30.7467H13.3279ZM25.6499 37.9477C26.8659 36.9344 27.8349 36.092 28.5569 35.4207C29.2789 34.7367 29.8806 34.0274 30.3619 33.2927C30.8433 32.558 31.0839 31.836 31.0839 31.1267C31.0839 30.4807 30.9319 29.974 30.6279 29.6067C30.3239 29.2394 29.8553 29.0557 29.2219 29.0557C28.5886 29.0557 28.1009 29.271 27.7589 29.7017C27.4169 30.1197 27.2396 30.696 27.2269 31.4307H24.6429C24.6936 29.9107 25.1433 28.758 25.9919 27.9727C26.8533 27.1874 27.9426 26.7947 29.2599 26.7947C30.7039 26.7947 31.8123 27.181 32.5849 27.9537C33.3576 28.7137 33.7439 29.7207 33.7439 30.9747C33.7439 31.9627 33.4779 32.9064 32.9459 33.8057C32.4139 34.705 31.8059 35.4904 31.1219 36.1617C30.4379 36.8204 29.5449 37.6184 28.4429 38.5557H34.0479V40.7597H24.6619V38.7837L25.6499 37.9477Z"
                fill="currentColor" />
              <path
                d="M36.1948 28.8842C36.1948 29.4438 36.2557 29.8634 36.3775 30.1432C36.4992 30.423 36.6967 30.5628 36.9699 30.5628C37.5097 30.5628 37.7796 30.0033 37.7796 28.8842C37.7796 27.7717 37.5097 27.2155 36.9699 27.2155C36.6967 27.2155 36.4992 27.3537 36.3775 27.6302C36.2557 27.9067 36.1948 28.3247 36.1948 28.8842ZM38.456 28.8842C38.456 29.6347 38.3293 30.2024 38.0758 30.5875C37.8257 30.9693 37.457 31.1602 36.9699 31.1602C36.5091 31.1602 36.1504 30.9644 35.8936 30.5727C35.6402 30.181 35.5135 29.6182 35.5135 28.8842C35.5135 28.1371 35.6352 27.5742 35.8788 27.1957C36.1257 26.8172 36.4894 26.6279 36.9699 26.6279C37.4472 26.6279 37.8142 26.8238 38.0709 27.2155C38.3276 27.6071 38.456 28.1634 38.456 28.8842ZM40.5395 31.7774C40.5395 32.3402 40.6003 32.7615 40.7221 33.0413C40.8439 33.3178 41.043 33.456 41.3195 33.456C41.596 33.456 41.8001 33.3194 41.9317 33.0462C42.0634 32.7697 42.1292 32.3468 42.1292 31.7774C42.1292 31.2145 42.0634 30.7982 41.9317 30.5283C41.8001 30.2551 41.596 30.1185 41.3195 30.1185C41.043 30.1185 40.8439 30.2551 40.7221 30.5283C40.6003 30.7982 40.5395 31.2145 40.5395 31.7774ZM42.8056 31.7774C42.8056 32.5245 42.6789 33.0906 42.4254 33.4757C42.1753 33.8575 41.8067 34.0484 41.3195 34.0484C40.8521 34.0484 40.4917 33.8526 40.2383 33.4609C39.9881 33.0693 39.8631 32.5081 39.8631 31.7774C39.8631 31.0302 39.9849 30.4674 40.2284 30.0889C40.4753 29.7104 40.839 29.5211 41.3195 29.5211C41.7869 29.5211 42.1506 29.7153 42.4106 30.1037C42.6739 30.4888 42.8056 31.0467 42.8056 31.7774ZM41.5318 26.7316L37.5278 33.9497H36.8021L40.8061 26.7316H41.5318Z"
                fill="white" />
              <path
                d="M23.5776 18.4198H25.5424V22.8407H23.5776V18.4198ZM30.4545 16.455H32.4193V22.8407H30.4545V16.455ZM27.0161 13.5078H28.9809V22.8407H27.0161V13.5078Z"
                fill="#6A6A9F" />
              <defs>
                <linearGradient id="paint0_linear_622:13696" x1="5.54791e-07" y1="42.0001" x2="54.6039" y2="41.9535"
                  gradientUnits="userSpaceOnUse">
                  <stop stopColor="#E323FF" />
                  <stop offset="1" stopColor="#7517F8" />
                </linearGradient>
              </defs>
            </svg>
            <div className="mt-6">
              <h5 className="text-xl text-gray-700 text-center">
                Network Providers
              </h5>
              {/* <div className="mt-2 flex justify-center gap-4">
                <h3 className="text-3xl font-bold text-gray-700">28</h3>
                <div className="flex items-end gap-1 text-green-500">
                  <svg className="w-3" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.00001 0L12 8H-3.05176e-05L6.00001 0Z" fill="currentColor" />
                  </svg>
                  <span>2%</span>
                </div>
              </div>
              <span className="block text-center text-gray-500">Compared to last week 13</span> */}
            </div>
            <table className="mt-6 -mb-2 w-full text-gray-600">
              <tbody>
                {
                  technologies?.networks?.map((network: Record<string, string>, index: number) => (
                    <tr key={`technologie-network-item-${index}-${network.name}`}>
                      <td className="py-2">{network.name}</td>
                      <td className="text-gray-500">{network.total}</td>
                      <td>
                        <svg className="w-16 ml-auto" viewBox="0 0 68 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect opacity="0.4" width="17" height="21" rx="1" fill="#e4e4f2" />
                          <rect opacity="0.4" x="19" width="14" height="21" rx="1" fill="#e4e4f2" />
                          <rect opacity="0.4" x="35" width="14" height="21" rx="1" fill="#e4e4f2" />
                          <rect opacity="0.4" x="51" width="17" height="21" rx="1" fill="#e4e4f2" />
                          <path
                            d="M0 7C8.62687 7 7.61194 16 17.7612 16C27.9104 16 25.3731 9 34 9C42.6269 9 44.5157 5 51.2537 5C57.7936 5 59.3731 14.5 68 14.5"
                            stroke="url(#paint0_linear_622:13631)" strokeWidth="2" strokeLinejoin="round" />
                          <defs>
                            <linearGradient id="paint0_linear_622:13631" x1="68" y1="7.74997" x2="1.69701" y2="8.10029"
                              gradientUnits="userSpaceOnUse">
                              <stop stopColor="#E323FF" />
                              <stop offset="1" stopColor="#7517F8" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </td>
                    </tr>
                  ))
                }
                {/* <tr>
                  <td className="py-2">Customize</td>
                  <td className="text-gray-500">1200</td>
                  <td>
                    <svg className="w-16 ml-auto" viewBox="0 0 68 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect opacity="0.4" width="17" height="21" rx="1" fill="#e4e4f2" />
                      <rect opacity="0.4" x="19" width="14" height="21" rx="1" fill="#e4e4f2" />
                      <rect opacity="0.4" x="35" width="14" height="21" rx="1" fill="#e4e4f2" />
                      <rect opacity="0.4" x="51" width="17" height="21" rx="1" fill="#e4e4f2" />
                      <path
                        d="M0 12.929C8.69077 12.929 7.66833 9.47584 17.8928 9.47584C28.1172 9.47584 25.5611 15.9524 34.2519 15.9524C42.9426 15.9524 44.8455 10.929 51.6334 10.929C58.2217 10.929 59.3092 5 68 5"
                        stroke="url(#paint0_linear_622:13640)" strokeWidth="2" strokeLinejoin="round" />
                      <defs>
                        <linearGradient id="paint0_linear_622:13640" x1="34" y1="5" x2="34" y2="15.9524"
                          gradientUnits="userSpaceOnUse">
                          <stop stopColor="#8AFF6C" />
                          <stop offset="1" stopColor="#02C751" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td className="py-2">Other</td>
                  <td className="text-gray-500">12</td>
                  <td>
                    <svg className="w-16 ml-auto" viewBox="0 0 68 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect opacity="0.4" width="17" height="21" rx="1" fill="#e4e4f2" />
                      <rect opacity="0.4" x="19" width="14" height="21" rx="1" fill="#e4e4f2" />
                      <rect opacity="0.4" x="35" width="14" height="21" rx="1" fill="#e4e4f2" />
                      <rect opacity="0.4" x="51" width="17" height="21" rx="1" fill="#e4e4f2" />
                      <path
                        d="M0 6C8.62687 6 6.85075 12.75 17 12.75C27.1493 12.75 25.3731 9 34 9C42.6269 9 42.262 13.875 49 13.875C55.5398 13.875 58.3731 6 67 6"
                        stroke="url(#paint0_linear_622:13649)" strokeWidth="2" strokeLinejoin="round" />
                      <defs>
                        <linearGradient id="paint0_linear_622:13649" x1="67" y1="7.96873" x2="1.67368" y2="8.44377"
                          gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FFD422" />
                          <stop offset="1" stopColor="#FF7D05" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
