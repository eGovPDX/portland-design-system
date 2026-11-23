<?php

namespace Drupal\portland_components;

use Drupal\Core\DependencyInjection\ContainerBuilder;
use Drupal\Core\DependencyInjection\ServiceProviderBase;

/**
 * Registers the Portland asset namespace with Drupal's Twig loader.
 */
class PortlandComponentsServiceProvider extends ServiceProviderBase {

  /**
   * {@inheritdoc}
   */
  public function alter(ContainerBuilder $container) {
    // Register the packaged SVG directory for source('@portland_assets/...').
    $container->getDefinition('twig.loader.filesystem')
      ->addMethodCall('addPath', [
        dirname(__DIR__) . '/assets',
        'portland_assets',
      ]);
  }

}
