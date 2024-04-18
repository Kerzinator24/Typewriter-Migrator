// Function to handle migration of NPCs used by typewriter
function migrateTypewriterNpcs(selectedModules, zip) {
  // Fetch files from the "pages" directory
  async function fetchPagesFiles() {
    const topLevelFolders = Object.keys(zip.files);
    const adaptersFolderName = topLevelFolders.find(folderName => folderName.endsWith('/adapters/'));
    const adaptersFolder = zip.folder(adaptersFolderName);
    const pagesFolder = zip.folder(adaptersFolderName + 'pages/');
    const files = [];
    if (pagesFolder) {
      await pagesFolder.forEach(async function(relativePath, zipEntry) {
        if (!zipEntry.dir) { // If it's a file
          files.push(zipEntry.name);
        }
      });
    }
    return files;
  }

  selectedModules.forEach(function(module) {
    // Implement migration logic for NPCs used by typewriter here
    console.log("Migrating NPCs used by typewriter for module:", module);
    // Example: This could include copying specific files or data related to NPCs used by typewriter
  });

  // Set the typewriterNpcsMigrated variable to true after migration
  typewriterNpcsMigrated = true;

  // Fetch files from the "pages" directory
  fetchPagesFiles().then(function(pagesFiles) {
    console.log("Files from 'pages' directory:", pagesFiles);
    // Perform additional operations with the fetched files if needed
  });

  // Run the confirm button functionality
  runConfirmButton();
}

// Function to close the modal and run confirm button functionality
function runConfirmButton() {
  closeModal();

  // Get selected modules
  const selectedModules = Array.from(document.querySelectorAll('input[name="file"]:checked')).map(function(checkbox) {
    return checkbox.value;
  });

  // Display selected modules
  displaySelectedModules(selectedModules);
}

// Function to close the modal
function closeModal() {
  const modal = document.getElementById('migrationModal');
  modal.style.display = "none";
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
          if (fileName.includes("Citizens") && file.name === "saves.yml") {
            const reader = new FileReader();
            reader.onload = function(event) {
              CitizensNPCsRaw = event.target.result; // Store the content of saves.yml in CitizensNPCsRaw variable
              console.log("Content of saves.yml stored in CitizensNPCsRaw:", CitizensNPCsRaw);
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

// Function to format file name
function formatFileName(filePath) {
  const formattedFileName = filePath.split('/').pop().replace(/\.jar$/i, '').replace(/([a-z])([A-Z])/g, '$1 $2').replace(/Adapter/g, '').trim();
  return formattedFileName.includes("Basic") ? null : formattedFileName;
}
