function migrateFolder(zip) {
  // Fetch content of files inside "pages" directory
  fetchPagesContent(zip);

  return new Promise(function(resolve) {
    const topLevelFolders = Object.keys(zip.files);
    const adaptersFolderName = topLevelFolders.find(folderName => folderName.endsWith('/adapters/'));
    if (!adaptersFolderName) return resolve([]); // If adapters folder doesn't exist, return an empty array

    const adaptersFolder = zip.folder(adaptersFolderName);
    const files = [];
    adaptersFolder.forEach(function(relativePath, zipEntry) {
      if (!zipEntry.dir) { // If it's a file
        files.push(zipEntry.name);
      }
    });

    // Remove the first item from the array
    files.shift();

    resolve(files);
  });
}

function confirmFiles(files) {
  const confirmedFiles = [];
  if (files.length === 0) {
    alert("No files found in the 'adapters' folder");
    return Promise.resolve(confirmedFiles);
  }

  return new Promise(function(resolve) {
    resolve(files);
  });
}

function formatFileName(filePath) {
  const formattedFileName = filePath.split('/').pop().replace(/\.jar$/i, '').replace(/([a-z])([A-Z])/g, '$1 $2').replace(/Adapter/g, '').trim();
  return formattedFileName.includes("Basic") ? null : formattedFileName;
}

function checkIfMigrationNeeded(selectedModules) {
  let migrationNeeded = false;

  selectedModules.forEach(function(module) {
    const needsMigration = migratableModules.some(m => module.includes(m));
    if (!needsMigration) {
      // Display a message indicating that migration is not needed for this module
      const listItem = document.createElement('li');
      listItem.innerHTML = `<span>${formatFileName(module)}</span><p class="text-red-600 ml-2">No migration needed for this adapter.</p>`;
      document.getElementById('fileList').appendChild(listItem);
    } else {
      migrationNeeded = true;
      // Check if Citizens module is selected, if so, display the migration modal
      if (module.includes('Citizens')) {
        displayMigrationModal();
      }
    }
  });

  if (migrationNeeded) {
    // Display only the selected modules that need migration
    displaySelectedModules(selectedModules);
  } else {
    // Display a message indicating that migration is not needed for any selected modules
    document.getElementById('uploadArea').innerHTML = '<p class="text-xl font-semibold text-red-600">No migration needed for any selected adapters.</p>';
  }
}

// Function to display the modal if the selected modules include Citizens
function displayMigrationModal() {
  const modal = document.getElementById('migrationModal');
  modal.style.display = "block";
  modalDisplayed = true;

  // Add event listeners to the modal buttons
  document.getElementById('migrateAllNpcsBtn').addEventListener('click', function() {
    MigrationMode = 'all'; // Set MigrationMode to 'all'
    closeModal();
  });

  document.getElementById('migrateTypewriterNpcsBtn').addEventListener('click', function() {
    MigrationMode = 'typewriterOnly'; // Set MigrationMode to 'typewriterOnly'
    closeModal();
  });
}

// Function to close the modal
function closeModal() {
  const modal = document.getElementById('migrationModal');
  modal.style.display = "none";
  modalDisplayed = false;
}

// Function to migrate all NPCs
function migrateAllNpcs() {
  migrateAll = true;
  closeModal();
}

// Function to migrate NPCs used by Typewriter
function migrateTypewriterNpcs() {
  migrateTypewriter = true;
  closeModal();
}

// Function to display selected modules
function displaySelectedModules(selectedModules) {
  const fileList = document.getElementById('fileList');
  fileList.innerHTML = ''; // Clear the file list
  selectedModules.forEach(function(fileName, index) {
    const listItem = document.createElement('li');
    listItem.classList.add("flex", "items-center", "transition", "transform", "ease-in-out", "duration-300", "hover:scale-105", "delay-800", "animate__animated", "animate__fadeIn", "animate__delay-" + (index + 1), "animate__slideInFromTop");

    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.name = "file";
    checkbox.value = fileName;
    checkbox.checked = true;
    checkbox.disabled = true;
    listItem.appendChild(checkbox);

    const textNode = document.createTextNode(formatFileName(fileName));
    if (textNode) { // Only append text if it's not null
      const textContainer = document.createElement('span');
      textContainer.appendChild(textNode);
      textContainer.classList.add("ml-2"); // Adding margin between checkbox and text
      listItem.appendChild(textContainer);
    }

    const uploadButton = document.createElement('button');
    uploadButton.textContent = "Upload";
    uploadButton.classList.add("bg-blue-500", "hover:bg-blue-700", "text-white", "font-bold", "py-2", "px-4", "rounded", "transition", "duration-300", "ease-in-out", "mt-4", "ml-2", "inline-block");
    uploadButton.style.marginTop = "1rem";

    // Check if migration is needed for this module
    const needsMigration = migratableModules.some(m => fileName.includes(m));
    if (needsMigration) {
      uploadButton.addEventListener('click', function() {
        const fileInput = document.createElement('input');
        fileInput.type = "file";
        fileInput.addEventListener('change', function() {
          const file = this.files[0];
          if (!file) return;
          // Handle file upload
          console.log("Uploading file:", file);
          if (fileName.includes("Citizens")) {
            console.log("Citizens upload detected");
          }
          if (file.name === "saves.yml") {
            const reader = new FileReader();
            reader.onload = function(event) {
              const yamlContent = event.target.result;
              try {
                jsonData = jsyaml.load(yamlContent); // Parse YAML to JSON
                console.log(jsonData); // Output JSON to console
              } catch (error) {
                console.error("Error parsing YAML:", error);
              }
            };
            reader.readAsText(file);
          }
        });
        fileInput.click(); // Trigger file input click when button is clicked
      });
    } else {
      uploadButton.textContent = "No migration needed";
      uploadButton.classList.add("no-migration-needed"); // Style the button red
      uploadButton.disabled = true;
    }

    listItem.appendChild(uploadButton);

    fileList.appendChild(listItem);
  });
}