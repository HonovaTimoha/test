
const saveButton = document.getElementById('saveButton');
 const loadButton = document.getElementById('loadButton');

saveButton.addEventListener('click', () => {
  const form = document.querySelector('form');
  const data = {};

// Збереження значень полів введення у JSON-об'єкт
form.querySelectorAll('input[name^="inputField"]').forEach(input => {
  data[input.name] = input.value;
});

  // Збереження JSON-об'єкту у файлі
  const dataStr = JSON.stringify(data);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'data.json';
  link.click();
});

    loadButton.addEventListener('click', () => {
      // Завантаження файлу та його зчитування
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'application/json';
      input.onchange = () => {
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = event => {
          const dataStr = event.target.result;
          const data = JSON.parse(dataStr);

          // Відновлення значень полів введення
          const form = document.querySelector('form');
          form.querySelectorAll('input[name^="inputField"]').forEach(input => {
            if (input.name in data) {
              input.value = data[input.name];
            }
          });
        };
        reader.readAsText(file);
      };
      input.click();
    });