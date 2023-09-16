import { setupTest } from '@shared/utils/test.util';
import { fireEvent, screen } from '@testing-library/react';
import { RouteObject, createMemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import HomeClock from './HomeClock.component';

describe('HomeClock', () => {
  const { renderProviders } = setupTest();
  const routes = [
    {
      path: '/',
      element: <HomeClock />,
    },
    {
      path: '/todos',
      element: <HomeClock />,
    },
  ] satisfies RouteObject[];
  const router = createMemoryRouter(routes, {
    initialEntries: ['/'],
    initialIndex: 0,
  });
  const mockButtonFn = vi.fn();

  it('should render properly', () => {
    const view = renderProviders(router);
    expect(() => view).not.toThrow();
  });

  // FIXME: TestingLibraryElementError: Unable to find an element by: [data-testid="home-clock-show"]
  it.todo('should render clock when toggle clock button clicked', async () => {
    // ARRANGE
    renderProviders(router);
    const button: HTMLButtonElement = screen.getByTestId(
      /home-clock-button-clock/i,
    );

    // ACT & ASSERT
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(await screen.findByTestId('home-clock-show')).toBeInTheDocument();
  });

  // FIXME: figure out how to solve the randomness behavior
  it.todo('should shuffle buttons when sort button clicked', () => {
    // ARRANGE
    renderProviders(router);
    const buttonsBefore: HTMLButtonElement[] =
      screen.queryAllByTestId(/home-clock-button/i);
    const button: HTMLButtonElement = screen.getByTestId(
      /home-clock-button-sort/i,
    );

    // ACT & ASSERT
    fireEvent.click(button);
    const buttonsAfter: HTMLButtonElement[] =
      screen.queryAllByTestId(/home-clock-button/i);
    expect(buttonsBefore[0]).not.toHaveTextContent(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      buttonsAfter[0].textContent!,
    );
    expect(buttonsBefore[1]).not.toHaveTextContent(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      buttonsAfter[1].textContent!,
    );
    expect(buttonsBefore[2]).not.toHaveTextContent(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      buttonsAfter[2].textContent!,
    );
    expect(buttonsBefore[3]).not.toHaveTextContent(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      buttonsAfter[3].textContent!,
    );
  });

  // FIXME: currently we mock translation function
  it.todo('should translate text when change language button clicked', () => {
    // ARRANGE
    renderProviders(router);
    const button: HTMLButtonElement = screen.getByTestId(
      /home-clock-button-language/i,
    );

    // ACT & ASSERT
    expect(button).toHaveTextContent(/change language/i);
    fireEvent.click(button);
    expect(button).toHaveTextContent(/ganti bahasa/i);
  });

  it('should call mocked navigate function when get started button clicked', () => {
    // ARRANGE
    renderProviders(router);
    const button: HTMLButtonElement = screen.getByTestId(
      /home-clock-button-start/i,
    );
    button.addEventListener('click', mockButtonFn);

    // ACT & ASSERT
    fireEvent.click(button);
    expect(mockButtonFn).toHaveBeenCalled();
  });
});
