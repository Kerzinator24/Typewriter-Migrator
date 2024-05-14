function createNpcChecklists(jsonData) {
  const npcData = jsonData.npc;
  const npcModal = document.getElementById('npcModal');
  const npcList = document.getElementById('npcList');

  // Clear previous NPC list
  npcList.innerHTML = '';

  for (const npcId in npcData) {
    if (npcData.hasOwnProperty(npcId)) {
      const npc = npcData[npcId];
      const npcContainer = document.createElement('div');
      npcContainer.classList.add("npc-container");

      const npcInfoContainer = document.createElement('div');
      npcInfoContainer.classList.add("npc-info-container");

      // Create a checkbox for the NPC
      const checkbox = document.createElement('input');
      checkbox.type = "checkbox";
      checkbox.name = "npc-checkbox";
      checkbox.value = npcId;

      // Determine if all NPCs should be selected based on migration mode
      if (MigrationMode === 'all') {
        console.log(typeof npcIds[0])
        if (npcIds.includes(parseInt(npcId))) {
          console.log("success")
          checkbox.checked = true;
        }
      }

      //if MigrationMode is set to "typewriterOnly" only the NPCs with the id in the array npcIds will be selected
      else if (MigrationMode === 'typewriterOnly') {
        if (npcIds.includes(npcId)) {
          checkbox.checked = true;
        }
      }

      // Append the checkbox to the NPC info container
      npcInfoContainer.appendChild(checkbox);

      // Base64 decode the textureRaw property if it exists
      if (npc.traits && npc.traits.skintrait && npc.traits.skintrait.textureRaw) {
        const textureRaw = atob(npc.traits.skintrait.textureRaw);
        try {
          const textures = JSON.parse(textureRaw);
          const headUrl = textures.textures.SKIN.url.replace("http://textures.minecraft.net/texture/", "https://nmsr.nickac.dev/head/");
          const fullBodyUrl = textures.textures.SKIN.url.replace("http://textures.minecraft.net/texture/", "https://nmsr.nickac.dev/fullbody/");

          // Create an image element for the NPC's head
          const npcImage = document.createElement('img');
          npcImage.src = headUrl;
          npcImage.alt = `NPC ${npcId} Head`;

          // Apply CSS styling to adjust the size of the image and transition effect
          npcImage.classList.add('npc-image');
          npcImage.style.width = "50px"; // Set initial width
          npcImage.style.height = "auto"; // Maintain aspect ratio
          // Add transition effect with delay for translateY
          npcImage.style.transition = "transform 0.5s ease-in-out 0.2s, width 0.3s ease-in-out";

          // Apply CSS styling to adjust the size and position of the image and transition effect
          npcImage.classList.add('npc-image');
          npcImage.style.width = "50px"; // Set initial width
          npcImage.style.height = "auto"; // Maintain aspect ratio
          // Add transition effect with delay for translateY
          npcImage.style.transition = "transform 0.5s ease-in-out 0.2s, width 0.3s ease-in-out";

          // Add event listeners for hover behavior on the entire NPC container
          npcContainer.addEventListener('mouseenter', function () {
            // Delay the switch to full body and increase size
            setTimeout(function () {
              npcImage.src = fullBodyUrl; // Change the image source to full-body version
              npcImage.style.width = "100px"; // Decrease width
            });
          });

          npcContainer.addEventListener('mouseleave', function () {
            // Reset transform and size
            npcImage.style.transform = "translateY(0)";
            npcImage.src = headUrl; // Change back to head version
            npcImage.style.width = "50px"; // Reset width
          });

          // Append the image to the NPC info container
          npcInfoContainer.appendChild(npcImage);
          console.log(npc.name)
        } catch (error) {
          console.error('Error parsing textureRaw JSON:'+ npc.name, error, npc.name);
        }
      }

      //Check if the NPC is a "VILLAGER"
      else if (npc.traits.type === "VILLAGER") {
              let biome = "PLAINS";
              let profession = "NONE";
              try {
                if (npc.traits.villagertrait.type && npc.traits.profession) {
                  biome = npc.traits.villagertrait.type || "PLAINS";
                  profession = npc.traits.profession || "NONE";
                }
              } catch (error) {
                console.error(npc);
              }
            const headUrl = "images/villager/villager_head.png";
            let fullBodyUrl = "villager_full_body.png";
            if (biome === "DESERT") {
              if (profession === "ARMORER") {
                fullBodyUrl = "images/villager/desert/desert_armorer.png";
              } else if (profession === "BUTCHER") {
                fullBodyUrl = "images/villager/desert/desert_butcher.png";
              } else if (profession === "CARTOGRAPHER") {
                fullBodyUrl = "images/villager/desert/desert_cartographer.png";
              } else if (profession === "CLERIC") {
                fullBodyUrl = "images/villager/desert/desert_cleric.png";
              } else if (profession === "FARMER") {
                fullBodyUrl = "images/villager/desert/desert_farmer.png";
              } else if (profession === "FISHERMAN") {
                fullBodyUrl = "images/villager/desert/desert_fisherman.png";
              } else if (profession === "FLETCHER") {
                fullBodyUrl = "images/villager/desert/desert_fletcher.png";
              } else if (profession === "LEATHERWORKER") {
                fullBodyUrl = "images/villager/desert/desert_leatherworker.png";
              } else if (profession === "LIBRARIAN") {
                fullBodyUrl = "images/villager/desert/desert_librarian.png";
              } else if (profession === "MASON") {
                fullBodyUrl = "images/villager/desert/desert_mason.png";
              } else if (profession === "SHEPHERD") {
                fullBodyUrl = "images/villager/desert/desert_shepherd.png";
              } else if (profession === "TOOLSMITH") {
                fullBodyUrl = "images/villager/desert/desert_toolsmith.png";
              } else if (profession === "WEAPONSMITH") {
                fullBodyUrl = "images/villager/desert/desert_weaponsmith.png";
              } else if (profession === "NITWIT") {
                fullBodyUrl = "images/villager/desert/desert_nitwit.png";
              } else {
                fullBodyUrl = "images/villager/desert/desert_none.png";
              }
            } else if (biome === "JUNGLE") {
              if (profession === "ARMORER") {
                fullBodyUrl = "images/villager/jungle/jungle_armorer.png";
              } else if (profession === "BUTCHER") {
                fullBodyUrl = "images/villager/jungle/jungle_butcher.png";
              } else if (profession === "CARTOGRAPHER") {
                fullBodyUrl = "images/villager/jungle/jungle_cartographer.png";
              } else if (profession === "CLERIC") {
                fullBodyUrl = "images/villager/jungle/jungle_cleric.png";
              } else if (profession === "FARMER") {
                fullBodyUrl = "images/villager/jungle/jungle_farmer.png";
              } else if (profession === "FISHERMAN") {
                fullBodyUrl = "images/villager/jungle/jungle_fisherman.png";
              } else if (profession === "FLETCHER") {
                fullBodyUrl = "images/villager/jungle/jungle_fletcher.png";
              } else if (profession === "LEATHERWORKER") {
                fullBodyUrl = "images/villager/jungle/jungle_leatherworker.png";
              } else if (profession === "LIBRARIAN") {
                fullBodyUrl = "images/villager/jungle/jungle_librarian.png";
              } else if (profession === "MASON") {
                fullBodyUrl = "images/villager/jungle/jungle_mason.png";
              } else if (profession === "SHEPHERD") {
                fullBodyUrl = "images/villager/jungle/jungle_shepherd.png";
              } else if (profession === "TOOLSMITH") {
                fullBodyUrl = "images/villager/jungle/jungle_toolsmith.png";
              } else if (profession === "WEAPONSMITH") {
                fullBodyUrl = "images/villager/jungle/jungle_weaponsmith.png";
              } else if (profession === "NITWIT") {
                fullBodyUrl = "images/villager/jungle/jungle_nitwit.png";
              } else {
                fullBodyUrl = "images/villager/jungle/jungle_none.png";
              }
            } else if (biome === "SAVANNAH") {
              if (profession === "ARMORER") {
                fullBodyUrl = "images/villager/savannah/savannah_armorer.png";
              } else if (profession === "BUTCHER") {
                fullBodyUrl = "images/villager/savannah/savannah_butcher.png";
              } else if (profession === "CARTOGRAPHER") {
                fullBodyUrl = "images/villager/savannah/savannah_cartographer.png";
              } else if (profession === "CLERIC") {
                fullBodyUrl = "images/villager/savannah/savannah_cleric.png";
              } else if (profession === "FARMER") {
                fullBodyUrl = "images/villager/savannah/savannah_farmer.png";
              } else if (profession === "FISHERMAN") {
                fullBodyUrl = "images/villager/savannah/savannah_fisherman.png";
              } else if (profession === "FLETCHER") {
                fullBodyUrl = "images/villager/savannah/savannah_fletcher.png";
              } else if (profession === "LEATHERWORKER") {
                fullBodyUrl = "images/villager/savannah/savannah_leatherworker.png";
              } else if (profession === "LIBRARIAN") {
                fullBodyUrl = "images/villager/savannah/savannah_librarian.png";
              } else if (profession === "MASON") {
                fullBodyUrl = "images/villager/savannah/savannah_mason.png";
              } else if (profession === "SHEPHERD") {
                fullBodyUrl = "images/villager/savannah/savannah_shepherd.png";
              } else if (profession === "TOOLSMITH") {
                fullBodyUrl = "images/villager/savannah/savannah_toolsmith.png";
              } else if (profession === "WEAPONSMITH") {
                fullBodyUrl = "images/villager/savannah/savannah_weaponsmith.png";
              } else if (profession === "NITWIT") {
                fullBodyUrl = "images/villager/savannah/savannah_nitwit.png";
              } else {
                fullBodyUrl = "images/villager/savannah/savannah_none.png";
              }
            } else if (biome === "SNOW") {
              if (profession === "ARMORER") {
                fullBodyUrl = "images/villager/snow/snow_armorer.png";
              } else if (profession === "BUTCHER") {
                fullBodyUrl = "images/villager/snow/snow_butcher.png";
              } else if (profession === "CARTOGRAPHER") {
                fullBodyUrl = "images/villager/snow/snow_cartographer.png";
              } else if (profession === "CLERIC") {
                fullBodyUrl = "images/villager/snow/snow_cleric.png";
              } else if (profession === "FARMER") {
                fullBodyUrl = "images/villager/snow/snow_farmer.png";
              } else if (profession === "FISHERMAN") {
                fullBodyUrl = "images/villager/snow/snow_fisherman.png";
              } else if (profession === "FLETCHER") {
                fullBodyUrl = "images/villager/snow/snow_fletcher.png";
              } else if (profession === "LEATHERWORKER") {
                fullBodyUrl = "images/villager/snow/snow_leatherworker.png";
              } else if (profession === "LIBRARIAN") {
                fullBodyUrl = "images/villager/snow/snow_librarian.png";
              } else if (profession === "MASON") {
                fullBodyUrl = "images/villager/snow/snow_mason.png";
              } else if (profession === "SHEPHERD") {
                fullBodyUrl = "images/villager/snow/snow_shepherd.png";
              } else if (profession === "TOOLSMITH") {
                fullBodyUrl = "images/villager/snow/snow_toolsmith.png";
              } else if (profession === "WEAPONSMITH") {
                fullBodyUrl = "images/villager/snow/snow_weaponsmith.png";
              } else if (profession === "NITWIT") {
                fullBodyUrl = "images/villager/snow/snow_nitwit.png";
              } else {
                fullBodyUrl = "images/villager/snow/snow_none.png";
              }
            } else if (biome === "SWAMP") {
              if (profession === "ARMORER") {
                fullBodyUrl = "images/villager/swamp/swamp_armorer.png";
              } else if (profession === "BUTCHER") {
                fullBodyUrl = "images/villager/swamp/swamp_butcher.png";
              } else if (profession === "CARTOGRAPHER") {
                fullBodyUrl = "images/villager/swamp/swamp_cartographer.png";
              } else if (profession === "CLERIC") {
                fullBodyUrl = "images/villager/swamp/swamp_cleric.png";
              } else if (profession === "FARMER") {
                fullBodyUrl = "images/villager/swamp/swamp_farmer.png";
              } else if (profession === "FISHERMAN") {
                fullBodyUrl = "images/villager/swamp/swamp_fisherman.png";
              } else if (profession === "FLETCHER") {
                fullBodyUrl = "images/villager/swamp/swamp_fletcher.png";
              } else if (profession === "LEATHERWORKER") {
                fullBodyUrl = "images/villager/swamp/swamp_leatherworker.png";
              } else if (profession === "LIBRARIAN") {
                fullBodyUrl = "images/villager/swamp/swamp_librarian.png";
              } else if (profession === "MASON") {
                fullBodyUrl = "images/villager/swamp/swamp_mason.png";
              } else if (profession === "SHEPHERD") {
                fullBodyUrl = "images/villager/swamp/swamp_shepherd.png";
              } else if (profession === "TOOLSMITH") {
                fullBodyUrl = "images/villager/swamp/swamp_toolsmith.png";
              } else if (profession === "WEAPONSMITH") {
                fullBodyUrl = "images/villager/swamp/swamp_weaponsmith.png";
              } else if (profession === "NITWIT") {
                fullBodyUrl = "images/villager/swamp/swamp_nitwit.png";
              } else {
                fullBodyUrl = "images/villager/swamp/swamp_none.png";
              }
            } else if (biome === "TAIGA") {
              if (profession === "ARMORER") {
                fullBodyUrl = "images/villager/taiga/taiga_armorer.png";
              } else if (profession === "BUTCHER") {
                fullBodyUrl = "images/villager/taiga/taiga_butcher.png";
              } else if (profession === "CARTOGRAPHER") {
                fullBodyUrl = "images/villager/taiga/taiga_cartographer.png";
              } else if (profession === "CLERIC") {
                fullBodyUrl = "images/villager/taiga/taiga_cleric.png";
              } else if (profession === "FARMER") {
                fullBodyUrl = "images/villager/taiga/taiga_farmer.png";
              } else if (profession === "FISHERMAN") {
                fullBodyUrl = "images/villager/taiga/taiga_fisherman.png";
              } else if (profession === "FLETCHER") {
                fullBodyUrl = "images/villager/taiga/taiga_fletcher.png";
              } else if (profession === "LEATHERWORKER") {
                fullBodyUrl = "images/villager/taiga/taiga_leatherworker.png";
              } else if (profession === "LIBRARIAN") {
                fullBodyUrl = "images/villager/taiga/taiga_librarian.png";
              } else if (profession === "MASON") {
                fullBodyUrl = "images/villager/taiga/taiga_mason.png";
              } else if (profession === "SHEPHERD") {
                fullBodyUrl = "images/villager/taiga/taiga_shepherd.png";
              } else if (profession === "TOOLSMITH") {
                fullBodyUrl = "images/villager/taiga/taiga_toolsmith.png";
              } else if (profession === "WEAPONSMITH") {
                fullBodyUrl = "images/villager/taiga/taiga_weaponsmith.png";
              } else if (profession === "NITWIT") {
                fullBodyUrl = "images/villager/taiga/taiga_nitwit.png";
              } else {
                fullBodyUrl = "images/villager/taiga/taiga_none.png";
              }
            } else {
              if (profession === "ARMORER") {
                fullBodyUrl = "images/villager/plains/plains_armorer.png";
              } else if (profession === "BUTCHER") {
                fullBodyUrl = "images/villager/plains/plains_butcher.png";
              } else if (profession === "CARTOGRAPHER") {
                fullBodyUrl = "images/villager/plains/plains_cartographer.png";
              } else if (profession === "CLERIC") {
                fullBodyUrl = "images/villager/plains/plains_cleric.png";
              } else if (profession === "FARMER") {
                fullBodyUrl = "images/villager/plains/plains_farmer.png";
              } else if (profession === "FISHERMAN") {
                fullBodyUrl = "images/villager/plains/plains_fisherman.png";
              } else if (profession === "FLETCHER") {
                fullBodyUrl = "images/villager/plains/plains_fletcher.png";
              } else if (profession === "LEATHERWORKER") {
                fullBodyUrl = "images/villager/plains/plains_leatherworker.png";
              } else if (profession === "LIBRARIAN") {
                fullBodyUrl = "images/villager/plains/plains_librarian.png";
              } else if (profession === "MASON") {
                fullBodyUrl = "images/villager/plains/plains_mason.png";
              } else if (profession === "SHEPHERD") {
                fullBodyUrl = "images/villager/plains/plains_shepherd.png";
              } else if (profession === "TOOLSMITH") {
                fullBodyUrl = "images/villager/plains/plains_toolsmith.png";
              } else if (profession === "WEAPONSMITH") {
                fullBodyUrl = "images/villager/plains/plains_weaponsmith.png";
              } else if (profession === "NITWIT") {
                fullBodyUrl = "images/villager/plains/plains_nitwit.png";
              } else {
                fullBodyUrl = "images/villager/plains/plains_none.png";
              }
            }


            // Create an image element for the NPC's head
            const npcImage = document.createElement('img');
            npcImage.src = headUrl;
            npcImage.alt = `NPC ${npcId} Head`;

            // Apply CSS styling to adjust the size of the image and transition effect
            npcImage.classList.add('npc-image');
            npcImage.style.width = "50px"; // Set initial width
            npcImage.style.height = "auto"; // Maintain aspect ratio
            // Add transition effect with delay for translateY
            npcImage.style.transition = "transform 0.5s ease-in-out 0.2s, width 0.3s ease-in-out";

            // Apply CSS styling to adjust the size and position of the image and transition effect
            npcImage.classList.add('npc-image');
            npcImage.style.width = "50px"; // Set initial width
            npcImage.style.height = "auto"; // Maintain aspect ratio
            // Add transition effect with delay for translateY
            npcImage.style.transition = "transform 0.5s ease-in-out 0.2s, width 0.3s ease-in-out";

            // Add event listeners for hover behavior on the entire NPC container
            npcContainer.addEventListener('mouseenter', function () {
              // Delay the switch to full body and increase size
              setTimeout(function () {
                npcImage.src = fullBodyUrl; // Change the image source to full-body version
                npcImage.style.width = "100px"; // Decrease width
              });
            });

            npcContainer.addEventListener('mouseleave', function () {
              // Reset transform and size
              npcImage.style.transform = "translateY(0)";
              npcImage.src = headUrl; // Change back to head version
              npcImage.style.width = "50px"; // Reset width
            });

            // Append the image to the NPC info container
            npcInfoContainer.appendChild(npcImage);

      } else if (npc.traits.type === "ZOMBIE" ||
        npc.traits.type === "HUSK" ||
        npc.traits.type === "PIGLIN" ||
        npc.traits.type === "HOGLIN" ||
        npc.traits.type === "PIGLIN_BRUTE" ||
        npc.traits.type === "WARDEN" ||
        npc.traits.type === "ENDERMAN" ||
        npc.traits.type === "SKELETON" ||
        npc.traits.type === "COW" ||
        npc.traits.type === "IRON_GOLEM" ||
        npc.traits.type === "WITCH") {
        try {
          if (npc.traits.type === "ZOMBIE") {
            const headUrl = "images/zombie/zombie_head.png";
            const fullBodyUrl = "images/zombie/zombie_full_body.png";
          }
          if (npc.traits.type === "HUSK") {
            const headUrl = "images/husk/husk_head.png";
            const fullBodyUrl = "images/husk/husk_full_body.png";
          }
          if (npc.traits.type === "PIGLIN") {
            const headUrl = "images/piglin/piglin_head.png";
            const fullBodyUrl = "images/piglin/piglin_full_body.png";
          }
          if (npc.traits.type === "HOGLIN") {
            const headUrl = "images/hoglin/hoglin_head.png";
            const fullBodyUrl = "images/hoglin/hoglin_full_body.png";
          }
          if (npc.traits.type === "PIGLIN_BRUTE") {
            const headUrl = "images/piglin_brute/piglin_brute_head.png";
            const fullBodyUrl = "images/piglin_brute/piglin_brute_full_body.png";
          }
          if (npc.traits.type === "WARDEN") {
            const headUrl = "images/warden/warden_head.png";
            const fullBodyUrl = "images/warden/warden_full_body.png";
          }
          if (npc.traits.type === "ENDERMAN") {
            const headUrl = "images/enderman/enderman_head.png";
            const fullBodyUrl = "images/enderman/enderman_full_body.png";
          }
          if (npc.traits.type === "SKELETON") {
            const headUrl = "images/skeleton/skeleton_head.png";
            const fullBodyUrl = "images/skeleton/skeleton_full_body.png";
          }
          if (npc.traits.type === "COW") {
            const headUrl = "images/cow/cow_head.png";
            const fullBodyUrl = "images/cow/cow_full_body.png";
          }
          if (npc.traits.type === "IRON_GOLEM") {
            const headUrl = "images/iron_golem/iron_golem_head.png";
            const fullBodyUrl = "images/iron_golem/iron_golem_full_body.png";
          }
          if (npc.traits.type === "WITCH") {
            const headUrl = "images/witch/witch_head.png";
            const fullBodyUrl = "images/witch/witch_full_body.png";
          }


          // Create an image element for the NPC's head
          const npcImage = document.createElement('img');
          npcImage.src = headUrl;
          npcImage.alt = `NPC ${npcId} Head`;

          // Apply CSS styling to adjust the size of the image and transition effect
          npcImage.classList.add('npc-image');
          npcImage.style.width = "50px"; // Set initial width
          npcImage.style.height = "auto"; // Maintain aspect ratio
          // Add transition effect with delay for translateY
          npcImage.style.transition = "transform 0.5s ease-in-out 0.2s, width 0.3s ease-in-out";

          // Apply CSS styling to adjust the size and position of the image and transition effect
          npcImage.classList.add('npc-image');
          npcImage.style.width = "50px"; // Set initial width
          npcImage.style.height = "auto"; // Maintain aspect ratio
          // Add transition effect with delay for translateY
          npcImage.style.transition = "transform 0.5s ease-in-out 0.2s, width 0.3s ease-in-out";

          // Add event listeners for hover behavior on the entire NPC container
          npcContainer.addEventListener('mouseenter', function () {
            // Delay the switch to full body and increase size
            setTimeout(function () {
              npcImage.src = fullBodyUrl; // Change the image source to full-body version
              npcImage.style.width = "100px"; // Decrease width
            });
          });

          npcContainer.addEventListener('mouseleave', function () {
            // Reset transform and size
            npcImage.style.transform = "translateY(0)";
            npcImage.src = headUrl; // Change back to head version
            npcImage.style.width = "50px"; // Reset width
          });

          // Append the image to the NPC info container
          npcInfoContainer.appendChild(npcImage);
        } catch (error) {
          console.error('Error parsing textureRaw JSON:', error);
        }
      } else {
        console.log(npc)
      }

      // Create an unordered list for NPC details
      const detailsList = document.createElement('ul');

      // Add world and coordinates as bullet points
      const worldItem = document.createElement('li');
      worldItem.textContent = `World: ${npc.traits.location.world}`;

      const xCoordItem = document.createElement('li');
      xCoordItem.textContent = `X: ${npc.traits.location.x}`;

      const yCoordItem = document.createElement('li');
      yCoordItem.textContent = `Y: ${npc.traits.location.y}`;

      const zCoordItem = document.createElement('li');
      zCoordItem.textContent = `Z: ${npc.traits.location.z}`;

      // Append details to the list
      detailsList.appendChild(worldItem);
      detailsList.appendChild(xCoordItem);
      detailsList.appendChild(yCoordItem);
      detailsList.appendChild(zCoordItem);

      // Append the details list to the NPC info container
      npcInfoContainer.appendChild(detailsList);

      // Create a label for the NPC name
      const nameLabel = document.createElement('label');
      nameLabel.textContent = `NPC ${npcId}: ${npc.name}`;

      // Create a label for the NPC type
      const typeLabel = document.createElement('label');
      typeLabel.textContent = `,   Type: ${npc.traits.type}`;

      // Append the name label to the NPC info container
      npcInfoContainer.appendChild(nameLabel);

      // Append the NPC info container to the NPC container
      npcContainer.appendChild(npcInfoContainer);

      // Append the type label to the NPC info container
      npcInfoContainer.appendChild(typeLabel);

      // Append the NPC container to the NPC list
      npcList.appendChild(npcContainer);
    }
  }
  // Display the modal
  npcModal.style.display = "block";
  modalDisplayed = true;

  // Add event listener to the confirm selection button
  document.getElementById('confirmNpcSelection').addEventListener('click', function () {
    // Close the modal
    npcModal.style.display = "none";
    modalDisplayed = false;

    // Process the selected NPCs
    processSelectedNPCs();
  });

  const hashLength = 12; // Length of the hashed ID

  function generateHash(input, prefix) {
    // Concatenate the NPC ID and name
    const concatenated = input.id + input.name;

    // Encode to base64
    const encoded = btoa(concatenated);

    // Crop the hashed string to the desired length
    const cropped = encoded.substring(0, hashLength);

    // Add prefix
    const idWithPrefix = prefix + cropped;

    return idWithPrefix;
  }

  function processSelectedNPCs() {
    const selectedNPCs = document.querySelectorAll('input[name="npc-checkbox"]:checked');
    const selNPC = Array.from(selectedNPCs);
    selectedNPCs.forEach(npc => {
      const npcId = npc.value;
      const npcData = jsonData.npc[npcId];
      const npcName = npcData.name;

      // Generate hashed ID for definition and instance with "i" and "d" prefixes
      const definitionId = generateHash({id: npcId, name: npcName}, "d");
      const instanceId = generateHash({id: npcId, name: npcName}, "i");
      const glowingEffectId = generateHash({id: npcId, name: npcName}, "glo-d");
      const ageableId = generateHash({id: npcId, name: npcName}, "age-d");

      // Extract NPC traits with default values if missing
      const traits = npcData.traits || {};
      const location = traits.location || {};

      let npcObject;

      // Check if NPC type is "PLAYER"
      if (npcData.traits.type === "PLAYER") {
        // Extract relevant traits
        const skintrait = traits.skintrait || {};
        // Create JSON object for PLAYER NPC data
        npcObject = {
          name: npcName,
          type: "manifest",
          entries: [
            {
              id: definitionId,
              name: npcName + "_definition",
              displayName: npcName,
              sound: {
                soundId: {type: "default", value: ""},
                soundSource: {
                  type: "self",
                  entryId: "",
                  location: {world: "", x: 0, y: 0, z: 0, yaw: 0, pitch: 0}
                },
                track: "MASTER",
                volume: 0,
                pitch: 0
              },
              skin: {
                texture: skintrait.textureRaw || "",
                signature: skintrait.signature || ""
              },
              data: [],
              type: "npc_definition"
            },
            {
              id: instanceId,
              name: npcName + "_instance",
              definition: definitionId,
              spawnLocation: {
                world: location.world || "world",
                x: location.x || 0,
                y: location.y || 0,
                z: location.z || 0,
                yaw: location.yaw || 0,
                pitch: location.pitch || 0
              },
              data: [],
              activities: [],
              type: "npc_instance"
            }
          ],
          chapter: "migrated",
          priority: 0,
          version: "0.5.0-beta-79"
        };
        checkData(npcData);
      } else if (npcData.traits.type === "VILLAGER") {
        // Extract relevant traits
        const villagerType = traits.villagertrait.type || "";
        const profession = traits.profession || "";
        const level = npcData.traits.villagertrait ? mapVillagerLevel(npcData.traits.villagertrait.level) : "";

        // Function to map villager level number to string
        function mapVillagerLevel(level) {
          switch (parseInt(level)) {
            case 1:
              return "NOVICE";
            case 2:
              return "APPRENTICE";
            case 3:
              return "JOURNEYMAN";
            case 4:
              return "EXPERT";
            case 5:
              return "MASTER";
            default:
              return "";
          }
        }

        // Create JSON object for NPC data
        npcObject = {
          name: npcName.toLowerCase(),
          type: "manifest",
          entries: [
            {
              id: instanceId,
              name: npcName.toLowerCase() + "_instance",
              definition: definitionId,
              spawnLocation: {
                world: traits.location.world || "",
                x: parseFloat(traits.location.x) || 0,
                y: parseFloat(traits.location.y) || 0,
                z: parseFloat(traits.location.z) || 0,
                yaw: parseFloat(traits.location.yaw) || 0,
                pitch: parseFloat(traits.location.pitch) || 0
              },
              data: [],
              activities: [],
              type: "villager_instance"
            },
            {
              id: definitionId,
              name: npcName.toLowerCase() + "_definition",
              displayName: npcName,
              sound: {
                soundId: {type: "default", value: ""},
                soundSource: {
                  type: "self",
                  entryId: "",
                  location: {world: "", x: 0, y: 0, z: 0, yaw: 0, pitch: 0}
                },
                track: "MASTER",
                volume: 0,
                pitch: 0
              },
              data: [generateHash({id: npcId, name: npcName}, "B")],
              type: "villager_definition"
            },
            {
              id: generateHash({id: npcId, name: npcName}, "B"),
              name: npcName.toLowerCase() + "_data",
              villagerType: villagerType.toUpperCase(),
              profession: profession.toUpperCase(),
              level: level,
              priorityOverride: {enabled: false, value: 0},
              type: "villager_data"
            }
          ],
          chapter: "migrated",
          priority: 0,
          version: "0.5.0-beta-79"
        };
        checkData(npcData);
      } else if (npcData.traits.type === "ZOMBIE" ||
        npcData.traits.type === "HUSK" ||
        npcData.traits.type === "PIGLIN" ||
        npcData.traits.type === "HOGLIN" ||
        npcData.traits.type === "PIGLIN_BRUTE" ||
        npcData.traits.type === "WARDEN" ||
        npcData.traits.type === "ENDERMAN" ||
        npcData.traits.type === "SKELETON" ||
        npcData.traits.type === "COW" ||
        npcData.traits.type === "IRON_GOLEM" ||
        npcData.traits.type === "WITCH") {
        // Create JSON object for NPC data
        npcObject = {
          name: npcName.toLowerCase(),
          type: "manifest",
          entries: [
            {
              id: instanceId,
              name: npcName.toLowerCase() + "_instance",
              definition: definitionId,
              spawnLocation: {
                world: traits.location.world || "",
                x: parseFloat(traits.location.x) || 0,
                y: parseFloat(traits.location.y) || 0,
                z: parseFloat(traits.location.z) || 0,
                yaw: parseFloat(traits.location.yaw) || 0,
                pitch: parseFloat(traits.location.pitch) || 0
              },
              data: [],
              activities: [],
              type: npcData.traits.type.toLowerCase() + "_instance"
            },
            {
              id: definitionId,
              name: npcName.toLowerCase() + "_definition",
              displayName: npcName,
              sound: {
                soundId: {type: "default", value: ""},
                soundSource: {
                  type: "self",
                  entryId: "",
                  location: {world: "", x: 0, y: 0, z: 0, yaw: 0, pitch: 0}
                },
                track: "MASTER",
                volume: 0,
                pitch: 0
              },
              data: [],
              type: npcData.traits.type.toLowerCase() + "_definition"
            }
          ],
          chapter: "migrated",
          priority: 0,
          version: "0.5.0-beta-79"
        };
        checkData(npcData);
      } else {
        alert("NPC type not supported: " + npcData.traits.type + "\nPlease report this in the typewriter discord server.");
      }
      //funcion for checking for data
      function checkData(data) {
        // Check if NPC has glowing trait and add glowing effect data to the data list
        if (npcData.metadata.glowing === true) {
          npcObject.entries.push({
            id: glowingEffectId,
            name: npcName.toLowerCase() + "_glowing_effect_data",
            glowing: true
            priorityOverride: {enabled: false, value: 0},
            type: "glowing_effect_data",
          });
          // Add glowing effect ID to the data list
          npcObject.entries[0].data.push(glowingEffectId);
        } if (npcData.traits.age.age < 0) {
          npcObject.entries.push({
            id: ageableId,
            name: npcName.toLowerCase() + "_ageable_data",
            baby: true,
            priorityOverride: {enabled: false, value: 0},
            type: "ageable_data",
            });
        }

      }
      // Create a Blob object containing the JSON data
      const blob = new Blob([JSON.stringify(npcObject, null, 2)], {type: "application/json"});

      // Create a download link
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = npcName + ".json";
      downloadLink.click();
      delete jsonData.npc[npcId];
    });

    const yamlData = jsyaml.dump(jsonData, { lineWidth: -1 });
    console.log(yamlData); // Output YAML to console
    //download the yaml file
    const yamlBlob = new Blob([yamlData], {type: "application/yaml"});
    const yamlDownloadLink = document.createElement("a");
    yamlDownloadLink.href = URL.createObjectURL(yamlBlob);
    yamlDownloadLink.download = "saves.yml";
    yamlDownloadLink.click();
  }
}
