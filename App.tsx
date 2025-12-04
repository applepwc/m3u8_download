
import React, { useState } from 'react';
import InputGroup from './components/InputGroup';
import CodeBlock from './components/CodeBlock';
import { InstructionStep } from './components/InstructionStep';

const App: React.FC = () => {
    const [m3u8Url, setM3u8Url] = useState<string>("https://hls.example.com/videos5/d22727234698e8deafe0a3648/e698e8deafe0a36489ab8740.m3u8?auth_key=1762783300-6911f04460dbd-0-b6ab60dc2a221fff6d907ba7818c111c&v=2");
    const [keyHex, setKeyHex] = useState<string>("3036abe7f23b1f46a6902cb9da5ebb22");
    const [ivHex, setIvHex] = useState<string>("b3e628391049c4b689027bdb41dbf0");
    const [outputFilename, setOutputFilename] = useState<string>("video.mp4");

    const simpleCommand = `ffmpeg -http_persistent 0 -i "${m3u8Url}" -c copy "${outputFilename}"`;
    const advancedKeyLine = `#EXT-X-KEY:METHOD=AES-128,URI="video.key",IV=0x${ivHex}`;
    const advancedCommand = `ffmpeg -protocol_whitelist file,http,https,tcp,tls,crypto -allowed_extensions ALL -i playlist.m3u8 -c copy "${outputFilename}"`;

    const createKeyFileWin = `powershell -Command "$hex = '${keyHex}'; $bytes = (-split $hex -replace '..', '0x$&'); [System.IO.File]::WriteAllBytes('video.key', $bytes)"`;
    const createKeyFileMac = `echo "${keyHex}" | xxd -r -p > video.key`;


    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
            <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <header className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
                        M3U8 FFmpeg Downloader
                    </h1>
                    <p className="mt-4 text-lg text-gray-400">
                        Generate FFmpeg commands to download encrypted HLS streams.
                    </p>
                </header>

                <div className="space-y-12">
                    {/* Simple Method */}
                    <section className="bg-gray-800 rounded-lg p-6 shadow-lg">
                        <h2 className="text-2xl font-bold text-white mb-1">Method 1: The Simple Way</h2>
                        <p className="text-gray-400 mb-6">This method works if the M3U8 playlist is correctly configured. <strong className="text-blue-400">Always try this first.</strong></p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <InputGroup
                                id="m3u8-url"
                                label="M3U8 URL"
                                value={m3u8Url}
                                onChange={(e) => setM3u8Url(e.target.value)}
                                placeholder="https://..."
                            />
                            <InputGroup
                                id="output-filename"
                                label="Output Filename"
                                value={outputFilename}
                                onChange={(e) => setOutputFilename(e.target.value)}
                                placeholder="video.mp4"
                            />
                        </div>
                        
                        <h3 className="text-lg font-semibold text-white mb-2">Generated Command:</h3>
                        <CodeBlock code={simpleCommand} />
                         <p className="text-sm text-gray-500 mt-4">
                            Note: If you get a '403 Forbidden' error, the server might require a user agent. Try adding <code className="bg-gray-700 text-pink-400 px-1 rounded">-user_agent "Mozilla/5.0"</code> before the <code className="bg-gray-700 text-pink-400 px-1 rounded">-i</code> flag.
                        </p>
                    </section>

                    {/* Advanced Method */}
                    <section className="bg-gray-800 rounded-lg p-6 shadow-lg">
                        <h2 className="text-2xl font-bold text-white mb-1">Method 2: The Advanced Way</h2>
                        <p className="text-gray-400 mb-6">If the simple method fails (e.g., key download error), you'll need to create a local M3U8 file and provide the decryption key manually. Follow these steps carefully.</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <InputGroup
                                id="key-hex"
                                label="Decryption Key (Hex)"
                                value={keyHex}
                                onChange={(e) => setKeyHex(e.target.value)}
                                placeholder="32 character hex string"
                            />
                            <InputGroup
                                id="iv-hex"
                                label="Initialization Vector (IV) (Hex)"
                                value={ivHex}
                                onChange={(e) => setIvHex(e.target.value.replace(/^0x/, ''))}
                                placeholder="32 character hex string, '0x' is optional"
                            />
                        </div>

                        <div className="space-y-6">
                            <InstructionStep number={1} title="Download the M3U8 Playlist">
                                <p>Open the <a href={m3u8Url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">M3U8 URL</a> in your browser. Save the content as a text file named <code className="bg-gray-700 text-pink-400 px-1 rounded">playlist.m3u8</code>.</p>
                            </InstructionStep>
                             <InstructionStep number={2} title="Create the Key File">
                                <p>In the same folder as <code className="bg-gray-700 text-pink-400 px-1 rounded">playlist.m3u8</code>, run the command for your operating system to create <code className="bg-gray-700 text-pink-400 px-1 rounded">video.key</code>. This converts the hex key into the required binary format.</p>
                                <div className="mt-4 space-y-3">
                                    <div>
                                        <h4 className="font-semibold text-gray-300">Windows (in PowerShell):</h4>
                                        <CodeBlock code={createKeyFileWin} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-300">macOS / Linux (in Terminal):</h4>
                                        <CodeBlock code={createKeyFileMac} />
                                    </div>
                                </div>
                            </InstructionStep>
                            <InstructionStep number={3} title="Modify the Playlist File">
                                <p>Open <code className="bg-gray-700 text-pink-400 px-1 rounded">playlist.m3u8</code> in a text editor. Find the line that starts with <code className="bg-gray-700 text-pink-400 px-1 rounded">#EXT-X-KEY</code> and replace the entire line with the following:</p>
                                <div className="mt-2">
                                    <CodeBlock code={advancedKeyLine} />
                                </div>
                            </InstructionStep>

                            <InstructionStep number={4} title="Run the Final FFmpeg Command">
                                 <p>Finally, open your terminal/PowerShell in the folder containing your two new files and run this command. The <code className="bg-gray-700 text-pink-400 px-1 rounded">-protocol_whitelist</code> flag is important to allow FFmpeg to read the local playlist while fetching video segments from the internet.</p>
                                 <div className="mt-2">
                                     <CodeBlock code={advancedCommand} />
                                 </div>
                            </InstructionStep>
                        </div>
                    </section>
                </div>

                <footer className="text-center mt-12 text-gray-500 text-sm">
                    <p>Make sure you have <a href="https://ffmpeg.org/download.html" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">FFmpeg</a> installed and accessible in your system's PATH.</p>
                    <p>&copy; {new Date().getFullYear()} M3U8 FFmpeg Downloader. For educational purposes only.</p>
                </footer>
            </main>
        </div>
    );
};

export default App;
