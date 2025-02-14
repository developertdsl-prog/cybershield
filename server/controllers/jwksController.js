const getJwks = (req, res) => {
  // Public JWKS discovery spec
  res.json({
    keys: [
      {
        kty: 'RSA',
        use: 'sig',
        alg: 'RS256',
        kid: 'cybershield_key_2025_01',
        n: 'u1G...mock_public_modulus...XYZ',
        e: 'AQAB'
      }
    ]
  });
};

module.exports = { getJwks };
