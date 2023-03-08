<template>
  <nav class="menu" :class="{ 'dark-mode': isDarkMode }">
    <div class="menu-container">
      <div class="logo-container">
        <a href="/" class="logo"></a>
      </div>
      <div class="menu-items-container" ref="menuItemsContainer">
        <div class="menu-items" ref="menuItems">
          <a href="#" class="menu-item">Home</a>
          <a href="#" class="menu-item">About</a>
          <a href="#" class="menu-item">Contact</a>
          <a href="#" class="menu-item">Blog</a>
          <a href="#" class="menu-item">Products</a>
          <a href="#" class="menu-item">Services</a>
          <a href="#" class="menu-item">FAQ</a>
        </div>
      </div>
      <div class="menu-toggle" @click="toggleMenu">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-menu"
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isDarkMode: false,
      isMenuOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      // open menu
      if (this.isMenuOpen) {
        // add open to the css class for the menu
        let menuItemsContainer = this.$refs.menuItemsContainer;
        menuItemsContainer.classList.add("open");
        // add open to the css class for the menu items
      } else {
        // remove open from the css class for the menu
        let menuItemsContainer = this.$refs.menuItemsContainer;
        menuItemsContainer.classList.remove("open");
        // remove open from the css class for the menu items
      }
    },
    closeMenu() {
      this.isMenuOpen = false;
    }
  },
  mounted() {
    // logo to server domain
    let logo = document.querySelector(".logo");
    logo.textContent = window.location.hostname;
    window.addEventListener("click", e => {
      if (
          !this.$el.contains(e.target) &&
          this.isMenuOpen &&
          window.innerWidth < 992
      ) {
        this.closeMenu();
      }
    });

  },
};
</script>

<style scoped>
.menu {
  position: fixed;
  top: 0;
  left: 0;
  height: 60px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
}

.menu-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: rgb(255, 255, 255);
  text-decoration: none;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding-right: 20px;
}

.menu-items-container {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: auto;
  overflow-y: hidden;
  height: 100%;
  padding: 0 20px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.menu-items-container::-webkit-scrollbar {
  display: none;
}

.menu-items {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.menu-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 20px;
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
}

.menu-item:hover {
  color: #000;
  background-color: rgba(255, 255, 255, 0.5);
}

.menu-item:active {
  color: #000;
  background-color: rgba(255, 255, 255, 0.5);
}

.menu-toggle {
  display: none;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 20px;
  font-size: 1.5rem;
  color: #ffffff;
  cursor: pointer;
}

@media screen and (max-width: 992px) {
  .menu {
    top: 0;
    left: 0;
    width: 100%;
  }

  .logo {
    font-size: 1.25rem;

    max-width: 250px;
  }

  .menu-items-container {
    position: fixed;
    top: 60px;
    left: 0;
    width: 100%;
    height: calc(100vh - 60px);
    padding: 0;
    background-color: #212121;
    transform: translateX(-100%);
    transition: all 0.3s ease-in-out;
  }

  .menu-items-container.open {
    transform: translateX(0);
  }

  .menu-items {
    flex-direction: column;
    height: 100%;
  }

  .menu-item {
    width: 100%;
    padding: 20px 0;
    text-align: center;
    user-select: none;
    -webkit-tap-highlight-color: transparent; /* Disable tap highlight */
  }

  .menu-item:hover {
    background-color: transparent;
    color: rgba(255, 255, 255, 0.5);
  }

  .menu-toggle {
    display: flex;
    touch-action: manipulation;
    user-select: none;
    -webkit-tap-highlight-color: transparent; /* Disable tap highlight */
  }

  .menu-toggle svg {
    width: 24px;
    height: 24px;
    transition: transform 0.3s ease-in-out;
  }

  .menu-toggle svg:hover {
    transform: scale(1.1);
  }

  .menu-toggle svg:active {
    transform: scale(0.9);
  }

  .menu-toggle svg path {
    stroke: #000;
  }

  .menu-toggle svg path:hover {
    stroke: #fff;
  }

  .menu-toggle svg path.open {
    stroke: #fff;
  }

  .menu-toggle svg path.open:hover {
    stroke: #000;
  }
}

</style>