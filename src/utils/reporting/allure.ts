import { allure } from 'allure-playwright';

export async function setEpic(value: string) {
  await allure.epic(value);
}

export async function setFeature(value: string) {
  await allure.feature(value);
}

export async function setStory(value: string) {
  await allure.story(value);
}

export async function setSeverity(value: 'blocker' | 'critical' | 'normal' | 'minor' | 'trivial') {
  await allure.severity(value);
}

export async function addAttachment(name: string, content: unknown) {
  await allure.attachment(name, JSON.stringify(content, null, 2), 'application/json');
}
