import net from 'net';

const helloMessage = 'H:KEQ0816927,0cc5d6,0113,00000000,1e13c151,00,32,100c0e,0b07,03,0000\r\n';

const metadataMessage = 'M:00,01,VgIGAQtIYWxsL1N0YWlycxMZdgYHS2l0Y2hlbhRcJgIGT2ZmaWNlEx/iAwtMaXZpbmcgUm9vbRRawAQOTWFzdGVyIEJlZHJvb20UXc4FC1Nld2luZyBSb29tFFwlCAEUWsBNRVExNzcyODAzFVJhZGlhdG9yIEJlaGluZCBDaGFpcgMBFFwlTUVRMTc3MzE2MAhSYWRpYXRvcgUBFFwmTUVRMTc3MzE2MQhSYWRpYXRvcgYDFO42TkVRMDA4NTcwMApUaGVybW9zdGF0AQETGXZNRVExNDQ1NjAyFFJhZGlhdG9yIDJuZCBMYW5kaW5nAQETCkNNRVExNDQyNzQ5FFJhZGlhdG9yIDFzdCBMYW5kaW5nAQEUXc5NRVExNzczNTgxD1JhZGlhdG9yIChMZWZ0KQQBEx/iTUVRMTQ0NzI2MQhSYWRpYXRvcgIB\r\n';

const configurationMessages = [
  'C:0cc5d6,7QzF1gATAf9LRVEwODE2OTI3AAsABEAAAAAAAAAAAP///////////////////////////wsABEAAAAAAAAAAQf///////////////////////////2h0dHA6Ly9tYXguZXEtMy5kZTo4MC9jdWJlADAvbG9va3VwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEdNVAAACgADAAAAAEJTVAAAAwACAAAOEA==\r\n',
  'C:131976,0hMZdgEBEKFNRVExNDQ1NjAyKhQ9CQcYA3AM/wAoSEkJKSApICkgKSApIEUgRSBFIEUgRSBFIChISQkpICkgKSApICkgRSBFIEUgRSBFIEUgKEhJCSkgKSApICkgKSBFIEUgRSBFIEUgRSAoSEkJKSApICkgKSApIEUgRSBFIEUgRSBFIChISQkpICkgKSApICkgRSBFIEUgRSBFIEUgKEhJCSkgKSApICkgKSBFIEUgRSBFIEUgRSAoSEkJKSApICkgKSApIEUgRSBFIEUgRSBFIA==\r\n',
  'C:131fe2,0hMf4gECEKFNRVExNDQ3MjYxIhQ9CQcYA3AM/wApICkgKSApICkgKSApIEUgRSBFIEUgRSBFICkgKSApICkgKSApICkgRSBFIEUgRSBFIEUgKElE2DzwKSApICkgKSBFIEUgRSBFIEUgRSAoSUTYPPApICkgKSApIEUgRSBFIEUgRSBFIChJRNg88CkgKSApICkgRSBFIEUgRSBFIEUgKElE2DzwKSApICkgKSBFIEUgRSBFIEUgRSAoSUTYPPApICkgKSApIEUgRSBFIEUgRSBFIA==\r\n',
  'C:14ee36,zhTuNgMBEP9ORVEwMDg1NzAwKhQ9CShISQkpICkgKSApICkgRSBFIEUgRSBFIEUgKEhJCSkgKSApICkgKSBFIEUgRSBFIEUgRSAoSEkJKSApICkgKSApIEUgRSBFIEUgRSBFIChISQkpICkgKSApICkgRSBFIEUgRSBFIEUgKEhJCSkgKSApICkgKSBFIEUgRSBFIEUgRSAoSEkJKSApICkgKSApIEUgRSBFIEUgRSBFIChISQkpICkgKSApICkgRSBFIEUgRSBFIEUgBxhw\r\n',
  'C:130a43,0hMKQwEBEKFNRVExNDQyNzQ5KhQ9CQcYA3AM/wAoSEkJKSApICkgKSApIEUgRSBFIEUgRSBFIChISQkpICkgKSApICkgRSBFIEUgRSBFIEUgKEhJCSkgKSApICkgKSBFIEUgRSBFIEUgRSAoSEkJKSApICkgKSApIEUgRSBFIEUgRSBFIChISQkpICkgKSApICkgRSBFIEUgRSBFIEUgKEhJCSkgKSApICkgKSBFIEUgRSBFIEUgRSAoSEkJKSApICkgKSApIEUgRSBFIEUgRSBFIA==\r\n',
  'C:145ac0,0hRawAEDEaFNRVExNzcyODAzJBQ9CQcYA3AM/wAoVEhsQMxJCCkgKSApIEUgRSBFIEUgRSBFIChUSGxAzEkIKSApICkgRSBFIEUgRSBFIEUgKEhIbCjMSQgpICkgKSBFIEUgRSBFIEUgRSAoSEhsKMxJCCkgKSApIEUgRSBFIEUgRSBFIChISGwozEkIKSApICkgRSBFIEUgRSBFIEUgKEhIbCjMSQgpICkgKSBFIEUgRSBFIEUgRSAoSEhsKMxJCCkgKSApIEUgRSBFIEUgRSB\r\n',
  'C:145dce,0hRdzgEEEaFNRVExNzczNTgxIBQ9CQcYA3AM/wAoVEBsKPBBCCkgKSApIEUgRSBFIEUgRSBFIChUQGwo8EEIKSApICkgRSBFIEUgRSBFIEUgKEhAYCjwQQgpICkgKSBFIEUgRSBFIEUgRSAoSEBgKPBBCCkgKSApIEUgRSBFIEUgRSBFIChIQGAo8EEIKSApICkgRSBFIEUgRSBFIEUgKEhAYCjwQQgpICkgKSBFIEUgRSBFIEUgRSAoSEBgKPBBCCkgKSApIEUgRSBFIEUgRSBFIA==\r\n',
  'C:145c25,0hRcJQEFEaFNRVExNzczMTYwJBQ9CQcYA3AM/wAobEjMQPApICkgKSApIEUgRSBFIEUgRSBFIChsSMxA8CkgKSApICkgRSBFIEUgRSBFIEUgKGxIzEDwKSApICkgKSBFIEUgRSBFIEUgRSAobEjMQPApICkgKSApIEUgRSBFIEUgRSBFIChsSMxA8CkgKSApICkgRSBFIEUgRSBFIEUgKGxIzEDwKSApICkgKSBFIEUgRSBFIEUgRSAobEjMQPApICkgKSApIEUgRSBFIEUgRSBFIA==\r\n',
  'C:145c26,0hRcJgEGEaFNRVExNzczMTYxJBQ9CQcYA3AM/wAoVEhsQMxI8CkgKSApIEUgRSBFIEUgRSBFIChUSGxAzEjwKSApICkgRSBFIEUgRSBFIEUgKEhIbEDMSPApICkgKSBFIEUgRSBFIEUgRSAoSEhsQMxI8CkgKSApIEUgRSBFIEUgRSBFIChISGxAzEjwKSApICkgRSBFIEUgRSBFIEUgKEhIbEDMSPApICkgKSBFIEUgRSBFIEUgRSAoSEhsQMxI8CkgKSApIEUgRSBFIEUgRSBFIA==\r\n',
];

const deviceListMessages = [
  'L:CxMZdgYSGAAkAAAACxMf4gISGB4iAK8ADBTuNgYSGAQkAAAAygsTCkPsEhgAJAAAAAsUWsBcEhgAFAC2AAsUXc4OEhgAFAClAAsUXCVcEhgAJADBAAsUXCbhEhgAIACyAA==\r\n',
  'L:CxMZdgYSG08kAAAACxMf4gISGB4iAK8ADBTuNgYSGwQkAAAAygsTCkPsEhtPJAAAAAsUWsBcEhgAFAC2AAsUXc4OEhgAFAClAAsUXCVcEhgAJADBAAsUXCbhEhgAIACyAA==\r\n',
  'L:CxMZdgYSG08kAAAACxMf4gISGB4iAK8ADBTuNgYSGwQkAAAAywsTCkPsEhtPJAAAAAsUWsBcEhgAFAC2AAsUXc4OEhgAFAClAAsUXCVcEhgAJADBAAsUXCbhEhgAIACyAA==\r\n',
  'L:CxMZdgYSG08kAAAACxMf4gISGB4iAK8ADBTuNgYSGwQkAAAAywsTCkPsEhtPJADLAAsUWsBcEhgAFAC2AAsUXc4OEhgAFAClAAsUXCVcEhgAJADBAAsUXCbhEhgAIACyAA==\r\n',
  'L:CxMZdgYSG08kAMsACxMf4gISGB4iAK8ADBTuNgYSGwQkAAAAywsTCkPsEhtPJADLAAsUWsBcEhgAFAC2AAsUXc4OEhgAFAClAAsUXCVcEhgAJADBAAsUXCbhEhgAIACyAA==\r\n',
  'L:CxMZdgYSGAAkAAAACxMf4gISGB4iAK8ADBTuNgYSGAQkAAAAywsTCkPsEhgAJAAAAAsUWsBcEhgAFAC2AAsUXc4OEhgAFAClAAsUXCVcEhgAJADBAAsUXCbhEhgAIACyAA==\r\n',
  'L:CxMZdgYSGAAkAAAACxMf4gISGB4iAK8ADBTuNgYSGAQkAAAAywsTCkPsEhgAJADLAAsUWsBcEhgAFAC2AAsUXc4OEhgAFAClAAsUXCVcEhgAJADBAAsUXCbhEhgAIACyAA==\r\n',
  'L:CxMZdgYSGAAkAAAACxMf4gISGB4iAK8ADBTuNgYSGAQkAAAAywsTCkPsEhgAJADLAAsUWsBcEhtPFADAAAsUXc4OEhgAFAClAAsUXCVcEhgAJADBAAsUXCbhEhgAIACyAA==\r\n',
  'L:CxMZdgYSGAAkAMsACxMf4gISGB4iAK8ADBTuNgYSGAQkAAAAywsTCkPsEhgAJADLAAsUWsBcEhtPFADAAAsUXc4OEhgAFAClAAsUXCVcEhgAJADBAAsUXCbhEhgAIACyAA==\r\n',
  'L:CxMZdgYSGAAkAMsACxMf4gISGB4iAK8ADBTuNgYSGAQkAAAAywsTCkPsEhgAJADLAAsUWsBcEhgAFADAAAsUXc4OEhgAFAClAAsUXCVcEhgAJADBAAsUXCbhEhgAIACyAA==\r\n',
  'L:CxMZdgYSGAAkAMsACxMf4gISGB4iAK8ADBTuNgYSGAQkAAAAygsTCkPsEhgAJAAAAAsUWsBcEhgAFADAAAsUXc4OEhgAFAClAAsUXCVcEhgAJADBAAsUXCbhEhgAIACyAA==\r\n',
  'L:CxMZdgYSGAAkAAAACxMf4gISGB4iAK8ADBTuNgYSGAQkAAAAygsTCkPsEhgAJAAAAAsUWsBcEhgAFADAAAsUXc4OEhgAFAClAAsUXCVcEhgAJADBAAsUXCbhEhgAIACyAA==\r\n',
  'L:CxMZdgYSGAAkAAAACxMf4gISGCIiAKsADBTuNgYSGAQkAAAAygsTCkPsEhgAJAAAAAsUWsBcEhgAFADAAAsUXc4OEhgAFAClAAsUXCVcEhgAJADBAAsUXCbhEhgAIACyAA==\r\n',
  'L:CxMZdgYSGAAkAAAACxMf4gISGCIiAKsADBTuNgYSGAQkAAAAygsTCkPsEhgAJADKAAsUWsBcEhgAFADAAAsUXc4OEhgAFAClAAsUXCVcEhgAJADBAAsUXCbhEhgAIACyAA==\r\n',
  'L:CxMZdgYSGAAkAAAACxMf4gISGCIiAKkADBTuNgYSGAQkAAAAygsTCkPsEhgAJADKAAsUWsBcEhgAFADAAAsUXc4OEhgAFACuAAsUXCVcEhgAJADBAAsUXCbhEhgAIACyAA==\r\n',
  'L:CxMZdgYSGAAkAAAACxMf4gISGCIiAKkADBTuNgYSGAQkAAAAygsTCkPsEhgAJADKAAsUWsBcEhgAFADAAAsUXc4OEhgAFACuAAsUXCVcEhgAJADDAAsUXCbhEhgAIACyAA==\r\n',
  'L:CxMZdgYSGAAkAAAACxMf4gISGCIiAKkADBTuNgYSGAQkAAAAygsTCkPsEhgAJAAAAAsUWsBcEhgAFADAAAsUXc4OEhgAFACuAAsUXCVcEhgAJADDAAsUXCbhEhgAIACyAA==\r\n',
  'L:CxMZdgYSGAAkAAAACxMf4gISGCwiAKcADBTuNgYSGAQkAAAAygsTCkPsEhgAJAAAAAsUWsBcEhgAFADAAAsUXc4OEhgAFACuAAsUXCVcEhgAJADDAAsUXCbhEhgAIACyAA==\r\n',
  'L:CxMZdgYSGAAkAAAACxMf4gISGCwiAKcADBTuNgYSGAQkAAAAyAsTCkPsEhgAJAAAAAsUWsBcEhgAFADAAAsUXc4OEhgAFACuAAsUXCVcEhgAJADDAAsUXCbhEhgAIACyAA==\r\n',
  'L:CxMZdgYSGAAkAAAACxMf4gISGCwiAAAADBTuNgYSGAQkAAAAyAsTCkPsEhgAJAAAAAsUWsBcEhgAFAAAAAsUXc4OEhgAFAAAAAsUXCVcEhgAJAAAAAsUXCbhEhgAIAAAAA==\r\n',
  'L:CxMZdgYSGAAkAAAACxMf4gISGCwiAAAADBTuNgYSGAQkAAAAygsTCkPsEhgAJAAAAAsUWsBcEhgAFAAAAAsUXc4OEhgAFAAAAAsUXCVcEhgAJAAAAAsUXCbhEhgAIAAAAA==\r\n',
];

export default class TestServer
{
  static create()
  {
    const server = net.createServer((socket) =>
    {
      socket.on('data', (buffer) =>
      {
        const request = buffer.toString('utf-8');
        if (request === 'l:\r\n')
        {
          const response = deviceListMessages[
            Math.floor(Math.random() * deviceListMessages.length)
          ];
          socket.write(response);
        }
      });

      socket.on('error', () =>
      {
        // Do nothing
      });
    });

    server.listen(62910, '127.0.0.1');

    server.on('connection', (socket) =>
    {
      // Write out the hello and metadata messages
      socket.write(helloMessage);
      socket.write(metadataMessage);

      // Loop through the configuration messages and write them all out
      for (let i = 0; i < configurationMessages.length; i += 1)
      {
        socket.write(configurationMessages[i]);
      }

      // Write a random device list message
      socket.write(deviceListMessages[Math.floor(Math.random() * deviceListMessages.length)]);
    });
  }
}
