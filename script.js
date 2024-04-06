document.addEventListener('DOMContentLoaded', () => {
  const selectedOptions = JSON.parse(localStorage.getItem('selectedOptions'));
  const dropZonesContainer = document.getElementById('dropZonesContainer');

  // Function to handle dropped files or directories
  const handleDrop = async (event, option) => {
    event.preventDefault();
    const items = event.dataTransfer.items;
    const files = [];

    // Traverse dropped items
    for (let i = 0; i < items.length; i++) {
      const item = items[i].webkitGetAsEntry(); // Get file or directory entry

      // Recursively traverse directories
      const traverseDirectory = async (entry, path = '') => {
        if (entry.isFile) {
          files.push({file: await new Promise(resolve => entry.file(resolve)), path});
        } else if (entry.isDirectory) {
          const dirReader = entry.createReader();
          const dirEntries = await new Promise(resolve => dirReader.readEntries(resolve));

          for (const dirEntry of dirEntries) {
            await traverseDirectory(dirEntry, `${path}${entry.name}/`);
          }
        }
      };

      await traverseDirectory(item);
    }

    // Handle the files obtained
    console.log(`Files dropped for ${option}:`, files);
  };

  selectedOptions.forEach(option => {
    const div = document.createElement('div');
    div.className = 'drop-zone border-2 border-dashed border-gray-300 rounded-md p-8 mb-8 mr-8';
    div.dataset.option = option;
    div.innerHTML = `
      <p class="text-gray-500">Drag & Drop ${option} files here</p>
    `;
    dropZonesContainer.appendChild(div);

    // Add drop event listener to each drop zone
    div.addEventListener('dragover', (event) => {
      event.preventDefault();
      div.classList.add('dragover');
    });

    div.addEventListener('dragleave', () => {
      div.classList.remove('dragover');
    });

    div.addEventListener('drop', (event) => {
      handleDrop(event, option);
      div.classList.remove('dragover');
    });
  });


  const migrateBtn = document.getElementById('migrateBtn');
  const progressBar = document.getElementById('progressBar');

  migrateBtn.addEventListener('click', () => {
    // Show loading bar
    progressBar.classList.remove('hidden');

    // Simulate file migration progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      progressBar.style.width = `${progress}%`;
      if (progress >= 100) {
        clearInterval(interval);
        progressBar.style.width = '0%';
        // Hide loading bar when migration is complete
        progressBar.classList.add('hidden');
      }
    }, 500);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const selectBtn = document.getElementById('selectBtn');

  selectBtn.addEventListener('click', () => {
    const selectedOptions = [];
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
      selectedOptions.push(checkbox.value);
    });
    localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
    window.location.href = 'file-migration.html';
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const selectBtn = document.getElementById('selectBtn');
  const firstCheckbox = document.querySelector('input[type="checkbox"]:first-child');

  firstCheckbox.checked = true;
  selectBtn.addEventListener('click', () => {
    const selectedOptions = [];
    document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
      selectedOptions.push(checkbox.value);
    });
    localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
    window.location.href = 'file-migration.html';
  });
});
