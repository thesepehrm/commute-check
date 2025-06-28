import { mount } from "svelte";
import type { Component } from "svelte";

export function createApp(component: Component) {
  const target = document.getElementById("app");
  if (!target) {
    throw new Error("Could not find app container");
  }

  return mount(component, { target });
}
