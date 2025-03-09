const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("UploadModule", (m) => {
  const upload = m.contract("Upload"); // No constructor arguments

  return { upload };
});